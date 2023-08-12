const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'srv1042.hstgr.io',
  user: 'u438552292_aktivai_min',
  password: 'Resc00p@12345',
  database: 'u438552292_aktivai',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user_id = email;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.send({ success: false, message: "An error occurred while registering. Please try again later." });
      } else {
        // Use the connection to perform the query
        connection.query(
          "INSERT INTO `User` (`user_id`, `email`, `password`) VALUES (?, ?, ?)",
          [user_id, email, hashedPassword], // Store the hashed password in the database
          (err, result) => {
            connection.release();

            if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                res.send({ success: false, message: "An account with this email address already exists. Please use a different email address." });
              } else {
                console.log(err);
                res.send({ success: false, message: "An error occurred while registering. Please try again later." });
              }
            } else {
              res.send({ success: true, message: "Account created successfully!" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "An error occurred while registering. Please try again later." });
  }
});

app.post('/UpdateProfile', (req, res) => {
  const { email, user_id, first_name, last_name, profile_picture, dob, gender, phone_number, bio, profession, city, states } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error getting a connection from the pool
      console.log(err);
      res.send({ success: false, message: "An error occurred while updating your profile. Please try again later." });
    } else {
      // Use the connection to perform the query
      connection.query(
        "UPDATE `User` SET `user_id` = ?, `first_name` = ?, `last_name` = ?, `profile_picture` = ?, `dob` = ?, `gender` = ?, `phone_number` = ?, `bio` = ?, `profession` = ?, `city` = ?, `states` = ? WHERE `email` = ?",
        [user_id, first_name, last_name, profile_picture, dob, gender, phone_number, bio, profession, city, states, email],
        (err, result) => {
          // Release the connection back to the pool
          connection.release();

          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              // Handle duplicate entry error
              res.send({ success: false, message: "The username is already taken. Please use a different username." });
            } else {
              // Handle other errors
              console.log(err); // Log the error object to see more details
              res.send({ success: false, message: "An error occurred while updating your profile. Please try again later." });
            }
          } else {
            res.send({ success: true, message: "Profile updated successfully!" });
          }
        }
      );
    }
  });
});


app.post('/sendVerificationCode', (req, res) => {
  const { email } = req.body;

  // Generate a random verification code
  const verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Send the verification code to the user's email address
  transporter.sendMail({
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`
  }, (err, info) => {
    if (err) {
      // Handle error sending the email
      console.log(err);
      res.send({ success: false, message: "An error occurred while sending the verification email. Please try again later." });
    } else {
      // Store the verification code in the database
      pool.getConnection((err, connection) => {
        if (err) {
          // Handle error getting a connection from the pool
          console.log(err);
          res.send({ success: false, message: "An error occurred while sending the verification email. Please try again later." });
        } else {
          // Use the connection to perform the query
          connection.query(
            "UPDATE `User` SET `verification_code` = ? WHERE `email` = ?",
            [verificationCode, email],
            (err, result) => {
              // Release the connection back to the pool
              connection.release();

              if (err) {
                // Handle errors
                console.log(err); // Log the error object to see more details
                res.send({ success: false, message: "An error occurred while sending the verification email. Please try again later." });
              } else {
                res.send({ success: true, message: "Verification code sent successfully! Please check your email." });
              }
            }
          );
        }
      });
    }
  });
});



app.post('/verify', (req, res) => {
  const { email, verificationCode } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error getting a connection from the pool
      console.log(err);
      res.send({ err });
    } else {
      // Use the connection to perform the query
      connection.query(
        "SELECT * FROM User WHERE email = ? AND verification_code = ?",
        [email,verificationCode],
        (err,result) => {
          // Release the connection back to the pool
          connection.release();

          if(err){
            req.setEncoding({ err });
          } else{
            if(result.length > 0){
              res.send({ success: true, message: "Email verified successfully!" });
            } else{
              res.send({ success: false, message: "Invalid verification code. Please try again." });
            }
          }
        }
      );
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).send({ success: false, message: "An error occurred while logging in. Please try again later." });
    } else {
      // Check if the email exists in the database
      connection.query(
        "SELECT `user_id`, `email`, `password` FROM `User` WHERE `email` = ?",
        [email],
        async (err, result) => {
          if (err) {
            console.log(err);
            connection.release();
            res.status(500).send({ success: false, message: "An error occurred while logging in. Please try again later." });
          } else {
            // Check if the email was found in the database
            if (result.length === 0) {
              connection.release();
              res.send({ success: false, message: "Email not found. Please check your credentials." });
            } else {
              const storedPasswordHash = result[0].password;
              try {
                // Compare the provided password with the stored password hash
                const passwordMatch = await bcrypt.compare(password, storedPasswordHash);
                connection.release();
                if (passwordMatch) {
                  // Passwords match, login successful
                  // Generate a JWT and send it back to the app
                  const token = jwt.sign({ email: email }, secret);
                  res.send({ success: true, message: "Login successful!", sessionToken: token });
                } else {
                  // Passwords don't match, login failed
                  res.send({ success: false, message: "Invalid password. Please check your credentials." });
                }
              } catch (compareError) {
                // Error occurred during password comparison
                console.log(compareError);
                res.status(500).send({ success: false, message: "An error occurred while logging in. Please try again later." });
              }
            }
          }
        }
      );
    }
  });
});


app.get('/GetUserProfile', (req, res) => {
  const { email } = req.query; // Assuming you will pass the user's email as a query parameter
  res.header('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate', 'x-content-type-options', 'nosniff');
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).send({ success: false, message: "An error occurred while fetching user profile data." });
    } else {
      connection.query(
        "SELECT first_name, last_name, profile_picture, bio, profession, city, states FROM User WHERE email = ?",
        [email],
        (err, result) => {
          connection.release();
          if (err) {
            console.log(err);
            res.status(500).send({ success: false, message: "An error occurred while fetching user profile data." });
          } else {
            if (result.length > 0) {
              const userProfileData = result[0];
              res.send({ success: true, data: userProfileData });
            } else {
              res.send({ success: false, message: "User profile data not found." });
            }
          }
        }
      );
    }
  });
});
exports.app = functions.https.onRequest(app);
