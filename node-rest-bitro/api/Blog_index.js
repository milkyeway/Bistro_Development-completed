const express = require('express');
const router = express.Router();
const request = require('request')

//掛件引入mysql
const mysql = require("mysql"); 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'YU',
  password: '1234',
  database: 'bistro'
});
db.connect();

/* GET users listing. */
router.get('/blog-content',function(req, res, next){
  const sql = "SELECT * FROM `blog_article`";
  db.query(sql,(error,results,fields)=>{
    res.json(results)
  })
})

/* 取最新5筆資料 */
router.get('/blog-recent5',function(req, res, next){
  // const sql = "SELECT * FROM `blog_article` ORDER BY RAND() LIMIT 5";
  const sql = `SELECT * FROM blog_article ORDER BY createdAt DESC LIMIT 5`;
  db.query(sql,(error,results,fields)=>{
    res.json(results)
  })
})

/* 取最新5筆資料 連sid用 */
router.get('/blog-recent5/:sid?',function(req, res, next){
  const sid = req.params.sid;
  // const sql = "SELECT * FROM `blog_article` ORDER BY RAND() LIMIT 5";
  const sql = `SELECT * FROM blog_article WHERE sid ='${sid}'`;
  db.query(sql,(error,results,fields)=>{
    res.json(results)
  })
})

/* GET users by sid. */
router.get('/blog-content/:sid?',function(req, res, next){
  const sid = req.params.sid;
  console.log("sid"+sid)
  const sql = `SELECT * FROM blog_article WHERE sid ='${sid}'`;
  return db.query(sql, [sid],(error,results,fields)=>{
    res.json(results)
  })
})

/* 讀取評論 */
// router.get('/blog-comment/list',function(req, res, next){
//   const sid = req.params.articleId;
//   console.log(sid)
//   const sql = `SELECT * FROM blog_comment WHERE blog_article ='${sid}'`;
//   return db.query(sql, [sid],(error,results,fields)=>{
//     res.json(results)
//   })
// })
/* 寫入評論 */
// router.post('/blog-comment/add',function(req, res, next){
//   const sid = req.params.articleId;
//   console.log(sid)
//   const sql = `INSERT INTO blog_reply (`sid`, `content`, `createdAt`, `updatedAt`, `commentId`, `userId`) VALUES (null, '${content}', '${createdAt}', '${updatedAt}', '${commentId}', '${userId}')`;
//   return db.query(sql, [sid],(error,results,fields)=>{
//     res.json(results)
//   })
// })

/* 讀取回覆 */
// router.get('/blog-reply/list',function(req, res, next){
//   const sid = req.params.commentId;
//   console.log("sid"+sid)
//   const sql = `INSERT INTO blog_reply WHERE blog_comment = '${sid}' `;
//   return db.query(sql, [sid],(error,results,fields)=>{
//     res.json(results)
//   })
// })
/* 寫入回覆 */
// router.post('/blog-reply/add',function(req, res, next){
//   const sid = req.params.commentId;
//   console.log("sid"+sid)
//   const sql = `INSERT INTO blog_reply WHERE blog_comment = '${sid}' `;
//   return db.query(sql, [sid],(error,results,fields)=>{
//     res.json(results)
//   })
// })

/* 篩選月份 */
router.get('/blog-month/:month',function(req, res, next){
  const month = req.params.month;
  const sql = `SELECT * FROM blog_article where createdAt like '${month}%'`;
  // const sql = "SELECT * FROM `blog_article` where `createdAt` like '${month}%'";
  console.log(sql)
  db.query(sql,(error,results,fields)=>{
    res.json(results)
  })
})

/* 取關鍵字tag */
router.get('/blog-tag/:tag',function(req, res, next){
  const tag = req.params.tag;
  const sql = `SELECT * FROM blog_article WHERE tag LIKE '${tag}'`;
  return db.query(sql, [tag],(error,results,fields)=>{
    res.json(results)
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;