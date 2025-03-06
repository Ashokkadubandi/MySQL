const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'my#@&67&!45#@123',
    database:'apsrtc'
});

module.exports = connection