require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtDecode = require('jwt-decode');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());


//app.set('trust proxy', true);
app.set('trust proxy', 1);

//app.set('trust proxy', ['loopback', '192.0.2.0/24', '2001:db8::/32']);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

const saltRounds = 10;
const secret = process.env.JWT_SECRET;
const { v4: uuidv4 } = require('uuid');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


// Register Route
app.post('/register', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
      success: false,
      message: "Validation errors occurred.",
      errors: extractedErrors
    });
  }

  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    pool.getConnection((err, connection) => {
      if (err) return next(err);

      connection.query("INSERT INTO `User` (`email`, `password`) VALUES (?, ?)", [email, hashedPassword], (err, result) => {
        connection.release();
        if (err) {
          // Check for duplicate email error
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: "An account with this email already exists." });
          } else {
            return next(err);
          }
        }
        res.json({ success: true, message: "Account created successfully!" });
      });
    });
  } catch (error) {
    next(error);
  }
});



// Update Profile Route
app.post('/UpdateProfile', authenticateToken, (req, res, next) => {
  const { email, first_name, last_name, profile_picture, dob, gender, phone_number, bio, profession, city, states } = req.body;

  pool.getConnection((err, connection) => {
    if (err) return next(err);

    const query = "UPDATE `User` SET `first_name` = ?, `last_name` = ?, `profile_picture` = ?, `dob` = ?, `gender` = ?, `phone_number` = ?, `bio` = ?, `profession` = ?, `city` = ?, `states` = ? WHERE `email` = ?";
    connection.query(query, [first_name, last_name, profile_picture, dob, gender, phone_number, bio, profession, city, states, email], (err, result) => {
      connection.release();
      if (err) return next(err);
      res.json({ success: true, message: "Profile updated successfully!" });
    });
  });
});

// Login Route
// Login Route
app.post('/login', loginLimiter, async (req, res, next) => {
  const { email, password } = req.body;

  // Log the input
  console.log(`Login attempt with email: ${email}`);

  try {
    pool.getConnection(async (err, connection) => {
      if (err) {
        console.error(`Error getting database connection: ${err}`);
        return next(err);
      }

      connection.query("SELECT `email`, `password` FROM `User` WHERE `email` = ?", [email], async (err, results) => {
        connection.release();
        if (err) {
          console.error(`Error executing query: ${err}`);
          return next(err);
        }

        // Log the intermediate result
        console.log(`Query result: ${results}`);

        if (results.length === 0) {
          console.warn(`Invalid email or password for email: ${email}`);
          return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          console.warn(`Invalid email or password for email: ${email}`);
          return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '24h' });
        // Log the successful login
        console.log(`Login successful for email: ${email}`);
        res.json({ success: true, message: "Login successful!", token });
      });
    });
  } catch (error) {
    // Log the exception
    console.error(`Exception caught: ${error}`);
    next(error);
  }
});


// Get User Profile Route
app.get('/getUserProfile', authenticateToken, (req, res, next) => {
  const userEmail = req.user.email;

  pool.getConnection((err, connection) => {
    if (err) return next(err);

    connection.query("SELECT * FROM User WHERE email = ?", [userEmail], (err, results) => {
      connection.release();
      if (err) return next(err);

      if (results.length > 0) {
        const userData = results[0];
        res.json({ success: true, user: userData });
      } else {
        res.status(404).json({ success: false, message: "User not found." });
      }
    });
  });
});

// Token Validation Route
app.get('/validateSessionToken', authenticateToken, (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  try {
    const decodedToken = jwtDecode(token);
    const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);
    res.json({ success: true, message: "Session token is valid.", expiresIn });
  } catch (error) {
    next(error);
  }
});

// Send Verification Code Route
app.post('/sendVerificationCode', (req, res, next) => {
  const { email } = req.body;
  const verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`
  }, (err, info) => {
    if (err) return next(err);

    pool.getConnection((err, connection) => {
      if (err) return next(err);

      connection.query("UPDATE `User` SET `verification_code` = ? WHERE `email` = ?", [verificationCode, email], (err, result) => {
        connection.release();
        if (err) return next(err);
        res.json({ success: true, message: "Verification code sent successfully! Please check your email." });
      });
    });
  });
});

// Email Verification Route
app.post('/verify', (req, res, next) => {
  const { email, verificationCode } = req.body;

  pool.getConnection((err, connection) => {
    if (err) return next(err);

    connection.query("SELECT * FROM User WHERE email = ? AND verification_code = ?", [email, verificationCode], (err, result) => {
      connection.release();
      if (err) return next(err);

      if (result.length > 0) {
        res.json({ success: true, message: "Email verified successfully!" });
      } else {
        res.json({ success: false, message: "Invalid verification code. Please try again." });
      }
    });
  });
});


// Error handling middleware using Winston
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error. Please try again later." });
});


exports.app = functions.https.onRequest(app);
