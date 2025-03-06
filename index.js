const express = require('express');
const app = express()
const mysql = require('mysql2')
const db = require('./config/db')
const port = 3002
app.use(express.json())

db.connect((err) => {
    if(err){
        console.log('Error connecting to MySQL')
        return
    }
    console.log("Connection successfull to apsrtc database")
})

app.get("/users",(req,res) => {
    db.query("select * from user_register",(err,result) => {
        if(err){
            return res.serverStatus(500).json({
                error:'Database error'
            })
        }
        res.json(result)
        
    })
})

app.post('/register',(req,res) => {
    const {employeeid,name,email,age} = req.body;
    const sqlQuery = "INSERT INTO user_register(employeeid,name,email,age)VALUES(?,?,?,?)"
    // console.log(sqlQuery)
    db.query(sqlQuery,[employeeid,name,email,age],(err,result) =>{
        if(err){
            if(err.errno === 1062){
                res.status(500).json({
                    "Error":"Username already exists try with another name"
                })
            }
            return 
        }
        console.log("inserted successful");
        res.status(200).json({
            id:result.insertId
        })
    })
})

app.listen(port, () => {
    `serever running at port ${port} http://localhost:${port}/`
})