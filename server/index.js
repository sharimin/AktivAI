const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3001;

// Enable CORS middleware
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '156.67.222.103',
  user: 'root',
  password: 'Aktivai@123',
  database: 'u438552292_aktivai',
});



app.post('/register', (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    connection.query("INSERT INTO users (email, username, password) VALUES(?, ?, ?)", [email, username, password],
        (err, result) => {
            if(result){
                res.send(result);
            }
            else {
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    )
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password],
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
