//酒具/酒 用路由

const express = require('express');
const router = express.Router();
const request = require('request')
const bluebird = require('bluebird');
const nodemailer = require('nodemailer');
// const creds = require('./Config');
// 掛件引入mysql
const mysql = require("mysql");
const db = mysql.createConnection({
  // host: '192.168.27.28',
  // user: 'YU',
  // password: '1234',
  // database: 'bistro'
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bistro'
});
db.connect();
bluebird.promisifyAll(db);

// 誰寄
var transport = {
  service: "Gmail",
  auth: {
    user: "namilkywaw@gmail.com",
    pass: "shana112216"
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  console.log(req.body)
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  console.log('進來了123')
  var content = `name: ${name} \n email: ${email} \n message: ${message} `
  // 寄給誰
  var mail = {
    from: name,
    to: 'namilkywaw@gmail.com',  // Change to email address that you want to receive messages on
    subject: 'Hello',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })
})

module.exports = router;
