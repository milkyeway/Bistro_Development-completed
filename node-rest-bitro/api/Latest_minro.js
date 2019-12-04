const express = require('express'); 
const router = express.Router();

// express.shin = 'abc';

const mysql = require('mysql');
const bluebird = require('bluebird');
var db = mysql.createConnection({ // 不是middleware 是全域變數
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'bistro'
});
db.connect(); 

bluebird.promisifyAll(db);


router.get("/latest_events_Limit5", (req, res) => {
    db.queryAsync("SELECT * FROM `activity` Limit 10,8 ")
    // Select * From Table Limit 10,5

        .then((results) => {
            // console.log(results);
            // console.log(111);
            res.json(results);
        })
        .catch((error) => {
            // console.log(error);
            res.send(error);
        });
    // console.log(222);
});

module.exports = router;
