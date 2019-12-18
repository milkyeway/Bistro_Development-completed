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

router.post("/latest_events_addToCart", (req, res) => {

    let sql = `INSERT INTO temporary_shopping_cart_activity VALUES (sid,${req.body.member_sid},${req.body.sid},'${req.body.activity_name}',${req.body.total},${req.body.total_price})`;
    console.log(sql);
    db.queryAsync(
        sql
    )
        .then((results) => {
            // console.log(results);
            res.json(results);
        })
        .catch((error) => {
            // console.log(error);
            res.send(error);
        });
    //   console.log(111222);
});
router.get("/latest_events/:place", (req, res) => {
    let page = 1;
    const place = req.params.place;
    let perPage = 9;
    // console.log("place" + place)
    db.queryAsync(`SELECT * FROM activity WHERE location LIKE '%${place}%' LIMIT ${(page-1)*perPage}, ${perPage}`)
    // db.queryAsync(`SELECT * FROM activity WHERE location LIKE '%${place}%'`)

        .then((results) => {
            console.log(results);
            // console.log(111);
            res.json(results);
        })
        .catch((error) => {
            // console.log(error);
            res.send(error);
        });
    // console.log(222);
});
    /************************************************* */
    router.get('/Latest_events_pages/:page', (req, res)=> {
            let page = req.params.page || 1; // req.params拿url // 可在網址切換頁數
            let perPage = 9;
            const output = {};
         // 看所有筆數和前5筆
            db.queryAsync("SELECT COUNT(1) total FROM `activity`")
                .then(results=>{
                    // res.json(results);
                    output.counts = results[0].total; 
                    return db.queryAsync(`SELECT * FROM activity LIMIT ${(page-1)*perPage}, ${perPage}`);// 從第幾筆到第幾筆
                })
                .then(results=>{
                    output.rows = results;
                    console.log(output);
                    res.json(output);
                })
                .catch(error=>{
                    console.log(error);
                    res.send(error); //打錯會秀到頁面上
                });
        });
    /************************************************* */
router.get("/latest_events_detail/:sid", (req, res) => {
    const sid = req.params.sid;
    // console.log("sid" + sid)
    db.queryAsync(`SELECT * FROM activity  WHERE sid=${sid}`)

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
router.get("/events_rand", (req, res) => {
    const u = req.params.u;
    db.queryAsync("SELECT * FROM `activity` ORDER BY RAND() LIMIT 18 ")

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
router.get("/latest_events", (req, res) => {
    db.queryAsync("SELECT * FROM `activity` ")

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
