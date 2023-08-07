const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');



const app = express();
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

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user_id = email;

  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error getting a connection from the pool
      console.log(err);
      res.send({ success: false, message: "An error occurred while registering. Please try again later." });
    } else {
      // Use the connection to perform the query
      connection.query(
        "INSERT INTO `User` (`user_id`, `email`, `password`) VALUES (?, ?, ?)",
        [user_id, email, password],
        (err, result) => {
          // Release the connection back to the pool
          connection.release();

          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              // Handle duplicate entry error
              res.send({ success: false, message: "An account with this email address already exists. Please use a different email address." });
            } else {
              // Handle other errors
              console.log(err); // Log the error object to see more details
              res.send({ success: false, message: "An error occurred while registering. Please try again later." });
            }
          } else {
            res.send({ success: true, message: "Account created successfully!" });
          }
        }
      );
    }
  });
});

app.post('/UpdateProfile', (req, res) => {
  const { email, user_id, first_name, last_name, profile_picture, dob, gender, phone_number, city, states } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error getting a connection from the pool
      console.log(err);
      res.send({ success: false, message: "An error occurred while updating your profile. Please try again later." });
    } else {
      // Use the connection to perform the query
      connection.query(
        "UPDATE `User` SET `user_id` = ?, `first_name` = ?, `last_name` = ?, `profile_picture` = ?, `dob` = ?, `gender` = ?, `phone_number` = ?, `city` = ?, `states` = ?, WHERE `email` = ?",
        [user_id, first_name, last_name, profile_picture, dob, gender, phone_number, city, states, email],
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


exports.app = functions.https.onRequest(app);
