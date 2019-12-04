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


router.get("/order_list_detail_accessories/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.queryAsync(`SELECT * FROM order_list_detail_accessories WHERE user_id=${user_id}`)

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
router.get("/order_list_detail_accessories", (req, res) => {
    db.queryAsync("SELECT * FROM `order_list_detail_accessories` ")

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
