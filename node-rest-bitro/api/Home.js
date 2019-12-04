//首頁用路由
const express = require('express');
const router = express.Router();
const request = require('request')

//掛件引入mysql
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bistro"
});
db.connect();
//首頁酒類活動圖
router.get('/Home_Container_LatestEvents', function (req, res, next) {
    //隨機撈8筆圖片資料
    const sql = "SELECT `sid`, `picture` ,`activity_name` FROM `activity` ORDER BY RAND() LIMIT 8";
    db.query(sql, (error, results, fields) => {
        res.json(results)
    })
})

//首頁部落格圖
router.get('/Home_Container_LatestArticles', function (req, res, next) {
    //隨機撈7筆部落格圖片資料
    const sql = "SELECT `sid`, `title`,`pic`,shortContent FROM `blog_article` ORDER BY RAND() LIMIT 7";
    db.query(sql, (error, results, fields) => {
        res.json(results)
    })
})

router.get('/Home_Wine', function (req, res, next) {
    //酒種類資料
    //隨機撈8筆資料並去除多餘重複數值    
    const sql = "SELECT DISTINCT `kind` FROM `wine_goods` ORDER BY RAND() LIMIT 8";
    db.query(sql, (error, results, fields) => {
        res.json(results)
    })
})


router.get('/Home_Wine_good', function (req, res, next) {
    // req.query
    console.log(req.query)
    //酒種類資料    
    const sql = "SELECT * FROM `wine_goods` WHERE `kind` = '" + req.query.kind + "' ORDER BY RAND() LIMIT 5";
    db.query(sql, (error, results, fields) => {
        res.json(results)
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
