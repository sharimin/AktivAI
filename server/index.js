const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 5000;

// Enable CORS middleware
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '156.67.222.103',
  user: 'u438552292_aktivai_min',
  password: 'Resc00p@12345',
  database: 'u438552292_aktivai',
});



app.post('/register', (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log(` Sending info ${email}`);
    connection.query("INSERT INTO User (email, username, password) VALUES(?, ?, ?)", [email, username, password],
        (err, result) => {
            if(result){
                res.send(result);
                console.log("sucessfull");
            }
            else {
                res.send({message: "ENTER CORRECT DETAILS!"})
                console.log(`ENTER CORRECT DETAILS!`);
            }
        }
    )
})


app.get('/Test', (req,res) => {
    return res.json({message: "Testing "})
})

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


