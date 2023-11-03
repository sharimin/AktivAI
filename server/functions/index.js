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
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: '173.82.165.202',
  user: 'evilmy_admin',
  password: 'hn#M4T*#fiiP',
  database: 'evilmy_aktiv_backend',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

pool.getConnection((err) => {
  if (err) {
    console.log('Connection error:', err);
  } else {
    console.log('Successfully connected to the database.');
    // You can now use 'connection' to query your database
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

app.get('/validateSessionToken', (req, res) => {
  const sessionToken = req.query.sessionToken;

  try {
    // Verify the session token using the same secret used to sign it
    jwt.verify(sessionToken, secret);
    res.send({ success: true });
  } catch (error) {
    // Session token is invalid
    res.send({ success: false });
  }
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



app.get('/GetUserProfile', (req, res) => {
  const { email } = req.query; // Assuming you will pass the user's email as a query parameter
  res.header('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate', 'x-content-type-options', 'nosniff');
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).send({ success: false, message: "An error occurred while fetching user profile data." });
    } else {
      connection.query(
        "SELECT * FROM User WHERE email = ?",
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
 
app.post('/createEvent', (req, res) => {
  const { event_name, event_start_date, event_end_date, event_location } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "An error occurred while creating the event. Please try again later." });
    } else {
      connection.query(
        "INSERT INTO `Event` (`event_name`, `event_start_date`, `event_end_date`, `event_location`) VALUES (?, ?, ?, ?)",
        [event_name, event_start_date, event_end_date, event_location],
        (err, result) => {
          if (err) {
            connection.release();
            console.log(err);
            res.send({ success: false, message: "An error occurred while creating the event. Please try again later." });
          } else {
            // Get the ID of the newly inserted event
            const event_id = result.insertId;

            // Generate a unique QR code string for the event that includes the event_id
            const qr_code_string = `${event_id}:${uuidv4()}`;

            // Update the qr_code_string field in the Event table
            connection.query(
              "UPDATE `Event` SET `qr_code_string` = ? WHERE `event_id` = ?",
              [qr_code_string, event_id],
              (err, result) => {
                connection.release();

                if (err) {
                  console.log(err);
                  res.send({ success: false, message: "An error occurred while creating the event. Please try again later." });
                } else {
                  res.send({ success: true, message: "Event created successfully!", qr_code_string });
                }
              }
            );
          }
        }
      );
    }
  });
});

app.post('/attendEvent', (req, res) => {
  const { user_id, event_id, scanned_qr_code_string, attendance_date } = req.body;
  res.setHeader('Content-Type', 'application/json');
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: "An error occurred while recording your attendance. Please try again later." });
    } else {
      // Check if the scanned QR code string matches the one stored in the database for the specified event
      connection.query(
        "SELECT `qr_code_string` FROM `Event` WHERE `event_id` = ?",
        [event_id],
        (err, result) => {
          if (err) {
            console.log(err);
            res.json({ success: false, message: "An error occurred while recording your attendance. Please try again later." });
          } else if (result.length === 0) {
            res.json({ success: false, message: "The specified event does not exist." });
          } else if (result[0].qr_code_string !== scanned_qr_code_string) {
            res.json({ success: false, message: "The scanned QR code does not match the one for the specified event." });
          } else {
            // The scanned QR code string matches the one stored in the database for the specified event
            connection.query(
              "INSERT INTO `Attendance` (`user_id`, `event_id`, `attendance_date`) VALUES (?, ?, ?)",
              [user_id, event_id, attendance_date],
              (err, result) => {
                connection.release();

                if (err) {
                  console.log(err);
                  res.json({ success: false, message: "An error occurred while recording your attendance. Please try again later." });
                } else {
                  res.json({ success: true, message: "Attendance recorded successfully!" });
                }
              }
            );
          }
        }
      );
    }
  });
});


app.get('/getAttendance', (req, res) => {
  const { user_id, event_id } = req.query;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "An error occurred while retrieving your attendance records. Please try again later." });
    } else {
      // Get the start and end dates of the specified event
      connection.query(
        "SELECT `event_start_date`, `event_end_date` FROM `Event` WHERE `event_id` = ?",
        [event_id],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ success: false, message: "An error occurred while retrieving your attendance records. Please try again later." });
          } else if (result.length === 0) {
            res.send({ success: false, message: "The specified event does not exist." });
          } else {
            const { event_start_date, event_end_date } = result[0];

            // Get the user's attendance records for the specified event
            connection.query(
              "SELECT `attendance_date` FROM `Attendance` WHERE `user_id` = ? AND `event_id` = ?",
              [user_id, event_id],
              (err, result) => {
                connection.release();

                if (err) {
                  console.log(err);
                  res.send({ success: false, message: "An error occurred while retrieving your attendance records. Please try again later." });
                } else {
                  const attendance_dates = result.map(row => row.attendance_date);

                  // Check if the user has attended all days of the event
                  let current_date = new Date(event_start_date);
                  let completed_attendance = true;
                  while (current_date <= new Date(event_end_date)) {
                    if (!attendance_dates.includes(current_date.toISOString().slice(0, 10))) {
                      completed_attendance = false;
                      break;
                    }
                    current_date.setDate(current_date.getDate() + 1);
                  }

                  res.send({ success: true, completed_attendance });
                }
              }
            );
          }
        }
      );
    }
  });
});

exports.app = functions.https.onRequest(app);
