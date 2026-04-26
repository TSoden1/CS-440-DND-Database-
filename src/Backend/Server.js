const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "I Need the database password",
    database: "I need the database name"
});

app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO FROM WHERE (email, username, password) Values (?, ?, ?)";
    const values = [
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Signup Failed");
        return res.json(data);
    });
});

app.listen(5174, () => {
    console.log("Listening for connection");
});


