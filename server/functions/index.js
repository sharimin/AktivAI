const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'srv1042.hstgr.io',
  user: 'u438552292_aktivai_min',
  password: 'Resc00p@12345',
  database: 'u438552292_aktivai',
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
  const { email, user_id, first_name, last_name, profile_picture, dob, gender, phone_number } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error getting a connection from the pool
      console.log(err);
      res.send({ success: false, message: "An error occurred while updating your profile. Please try again later." });
    } else {
      // Use the connection to perform the query
      connection.query(
        "UPDATE `User` SET `user_id` = ?, `first_name` = ?, `last_name` = ?, `profile_picture` = ?, `dob` = ?, `gender` = ?, `phone_number` = ? WHERE `email` = ?",
        [user_id, first_name, last_name, profile_picture, dob, gender, phone_number, email],
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

app.get('/Test', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ message: 'Error connecting to the database' });
    } else {
      res.json({ message: 'Connected to the database' });

      // Release the connection back to the pool
      connection.release();
    }
  });
});

app.post('/login', (req,res) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error getting a connection from the pool
      console.log(err);
      res.send({ err });
    } else {
      // Use the connection to perform the query
      connection.query(
        "SELECT * FROM User WHERE email = ? AND password = ?",
        [email,password],
        (err,result) => {
          // Release the connection back to the pool
          connection.release();

          if(err){
            req.setEncoding({ err });
          } else{
            if(result.length > 0){
              res.send(result);
            } else{
              res.send({ message: "WRONG email OR PASSWORD" });
            }
          }
        }
      );
    }
  });
});

exports.app = functions.https.onRequest(app);
