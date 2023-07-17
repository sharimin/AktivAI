const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

// Enable CORS middleware
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'srv1042.hstgr.io', // or '156.67.222.103'
    user: 'u438552292_aktivai_min',
    password: 'Resc00p@12345',
    database: 'u438552292_aktivai',
  });

  app.post('/register', (req,res) => {
    const user_id = req.body.email;
    const email = req.body.email;
    const username = req.body.username;
    const profilePicture = req.body.profile_picture;
    const ic = req.body.ic;
    const gender = req.body.gender;
    const phoneNumber = req.body.phone_number;
    const universityEmail = req.body.university_email;
    const walletAddress = req.body.wallet_address;

    console.log(` Sending info ${email}`);
    connection.query("INSERT INTO `User` (`user_id`, `email`, `username`, `profile_picture`, `ic`, `gender`, `phone_number`, `university_email`, `wallet_address`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [user_id, email, username, profilePicture, ic, gender, phoneNumber, universityEmail, walletAddress],
        (err, result) => {

            console.log(result);
            res.send({message: result})
            if(result){
         
                console.log(`Testing`); 
                console.log("sucessfull");
            }
            else {
                res.send({message: "ENTER CORRECT DETAILS!"})
                console.log(`ENTER CORRECT DETAILS!`);
            }
        }
    )
})

app.get('/Test', (req, res) => {
    console.log(`Testing`);
    connection.connect((err) => {
      if (err) {
        console.log('Error connecting to the database');
        return res.json({ message: 'Error connecting to the database '+ res +' '+  err});
      } else {
        console.log('Connected to the database');
        return res.json({ message: 'Connected to the database' });
      }
    });
  });

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM User WHERE username = ? AND password = ?", [username, password],
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }
            else {
                if(result.length > 0){
                    res.send(result);
                }
                else{
                    res.send({message: "WRONG USERNAME OR PASSWORD"})
                }
            }
        }
    )
})

exports.app = functions.https.onRequest(app);
