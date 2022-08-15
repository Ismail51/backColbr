const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const app = express()
app.use(cors())
app.use(express.json())

require("dotenv").config()

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

connection.connect()
console.log(connection.state);

app.post("/register", (req, res) => {
  const user = req.body
  console.log(user);
  const sql = `INSERT INTO user (firstName, name, mail, password) VALUES('${user.firstname}','${user.name}','${user.mail}','${user.password}')`
  connection.query(sql, (err, result) => {
    console.log("connected");
    res.json(result)
  })
})

app.post("/login", (req, res) => {
  const data = req.body
  const sql = `SELECT * FROM user WHERE mail='${data.mail}' AND password='${data.password}'`
  connection.query(sql, (err, result) => {
    console.log(result);
    res.json(result)
  })
})



app.listen(4000)