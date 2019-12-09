const express = require('express');
const router = express.Router();

// express.shin = 'abc';

const mysql = require('mysql');
const bluebird = require('bluebird');
var db = mysql.createConnection({ // 不是middleware 是全域變數
    host: 'localhost',
    user: 'YU',
    password: '1234',
    database: 'bistro'
});
db.connect();

bluebird.promisifyAll(db);


router.get("/order_list_detail_activity/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.queryAsync(`SELECT * FROM order_list_detail_activity WHERE user_id=${user_id}`)

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
router.get("/order_list_detail_activity", (req, res) => {
    db.queryAsync("SELECT * FROM `order_list_detail_activity` ")

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
