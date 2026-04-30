import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CS440SeaDogs",
    database: "DNDatabase"
});

db.connect();

app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO users (username, displayName, email, password) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.username,
        req.body.displayName,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if(err) {
            console.error(err);
            return res.json("Signup Failed");
        }
        return res.json(data);
    });
});

app.listen(5173, () => {
    console.log("Listening for connection");
});


