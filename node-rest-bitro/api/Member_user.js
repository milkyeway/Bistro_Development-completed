//會員登入  維德
const express = require('express');
const router = express.Router();
const request = require('request')
const bluebird = require('bluebird');
//掛件引入mysql
const mysql = require("mysql");
const db = mysql.createConnection({
  host: 'localhost',
  user: 'YU',
  password: '1234',
  database: 'bistro'
});
db.connect();
bluebird.promisifyAll(db);
// 會員資料
router.get('/user_id', function (req, res, next) {
  const sql = "SELECT * FROM `address_book`";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})
router.get('/member_coupon', function (req, res, next) {
  const sql = "SELECT * FROM `member_coupon`";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})
router.get('/member_blog_favorites', function (req, res, next) {
  const sql = "SELECT * FROM `member_blog_favorites`";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})
//優惠卷取單一
router.get("/member_coupon/:sid", (req, res) => {
  const sid = req.params.sid;
 
  db.queryAsync(`SELECT * FROM member_coupon  WHERE sid=${sid}`)

      .then((results) => {
        
          res.json(results);
      })
      .catch((error) => {
         
          res.send(error);
      });
 
});

//紅利取單一
router.get("/member_point/:member_sid", (req, res) => {
  const member_sid = req.params.member_sid;
 
  db.queryAsync(`SELECT * FROM member_point  WHERE member_sid=${member_sid}`)

      .then((results) => {
        
          res.json(results);
      })
      .catch((error) => {
         
          res.send(error);
      });
 
});
//部落格
router.get("/blog_Limit5", (req, res) => {
  db.queryAsync("SELECT * FROM `blog_article` Limit 10,5 ")
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
//優惠卷取單一
router.get("/member_allstorefav/:sid", (req, res) => {
  const sid = req.params.sid;
  
 
  db.queryAsync(`SELECT * FROM allstore WHERE sid IN (${sid})`)

      .then((results) => {
        
          res.json(results);
      })
      .catch((error) => {
         
          res.send(error);
      });
 
});



module.exports = router;
