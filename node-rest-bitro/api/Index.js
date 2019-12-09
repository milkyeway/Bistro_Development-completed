//酒具/酒 用路由

const express = require('express');
const router = express.Router();
const request = require('request')
const bluebird = require('bluebird');

// 掛件引入mysql
const mysql = require("mysql");
const db = mysql.createConnection({
  host: 'localhost',
  user: 'YU',
  password: '1234',
  database: 'bistro'
});
db.connect();
bluebird.promisifyAll(db);

//酒
router.get('/wine-wine-db', function (req, res, next) {
  const sql = "SELECT * FROM `wine_goods`";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})

// ********
router.get('/Wine_Tasting_detail/:sid', function (req, res, next) {
  const sid = req.params.sid;
  console.log("sid" + sid)
  const sql = `SELECT * FROM wine_goods WHERE sid ='${sid}'`;
  return db.query(sql, [sid], (error, results, fields) => {
    res.json(results)
  })
})

//  TO DO 

// router.get('/Wine_Tasting_detail/:sid', function (req, res, next) {
//   const sid = req.params.sid;
//   let user_id = 1
//   let output = {}
//   const sql = `SELECT * FROM wine_goods WHERE sid ='${sid}'`;
//   db.query(sql, [sid], (error, results, fields) => {
//     // console.log(fields)\
//     console.log(123,results)
//     output.acce = results
//   })
//   db.query(`SELECT product_id FROM favorite_wine_goods WHERE user_id=${user_id}`, [user_id], (error, results, fields) => {
//   output.mylike=results
//   console.log(123,results)
//   res.json(output)
//  })
// })

// // 酒類：側邊篩選欄
// router.get('/Wine_Tasting_item/:b1', function (req, res, next) {
//   // 在React 中因為觸發 handlefilter 事件，所以傳了value的變數回來，
//   // 之後再用 b1 這個變數去接 value，並把它塞入mysql的語法裡面
//   const classification = req.params.b1;
//   const sql = `SELECT * FROM wine_goods WHERE classification ='${classification}'`;
//   return db.query(sql, [classification], (error, results, fields) => {
//     res.json(results)
//   })
// })

// 酒類：側邊篩選欄 五大洲 
router.get('/Wine_Tastminus/:n1', function (req, res, next) {
  // 在React 中因為觸發 handlefilter 事件，所以傳了value的變數回來，
  // 之後再用 b1 這個變數去接 value，並把它塞入mysql的語法裡面
  const classification_PDC = req.params.n1;
  //去除多餘的重複國家	category_PDC
  const sql = `SELECT * FROM wine_goods WHERE classification_PDC ='${classification_PDC}'`;
  return db.query(sql, [classification_PDC], (error, results, fields) => {
    res.json(results)
  })
})

// 酒類：細節頁的隨機推薦商品
router.get('/Tasting_left_origin/rand', function (req, res, next) {
  const sql = "SELECT * from `wine_goods` order by rand() limit 5";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})

//酒類加進暫存購物車列表
router.post("/temporary_shopping_cart_wine_goods", (req, res) => {

  let sql = `INSERT INTO temporary_shopping_cart_wine_goods VALUES (sid,${req.body.member_sid},${req.body.sid},'${req.body.name}',${req.body.price},${req.body.qty})`;
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


router.get('/wine-tasting-kind/:cc?/:dd?', function (req, res, next) {
  const category_kind = req.params.cc;
  const sort = req.params.dd;
  let mySort = ''
  console.log("22222", category_kind, sort)
  if (sort === 'false') {
    console.log('sor1')
    mySort = ' ORDER BY price ASC'
  } else if (sort === 'true') {
    console.log('sor2')
    mySort = ' ORDER BY price DESC'
  } else {
    console.log('sor3')
    mySort = ''
  }
  const sql = `SELECT * FROM wine_goods WHERE classification = "${category_kind}" ${mySort}`;
  // console.log(sql)

  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})


router.get('/wine-tasting-best-brand', function (req, res, next) {
  const sql = "SELECT * FROM `wine_goods` WHERE `brand` = 'Ferraton Pere et Fils　菲拉頓酒莊'";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})






// -----------------------------------------------------------------


// 酒具資料總表
router.get('/wine-acce-db', function (req, res, next) {
  const sql = "SELECT * FROM `accessories`";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})


// 酒具：商品列表頁側邊篩選 CATE 和 SORT 欄
// 在React 中因為觸發 handlefilter 事件，所以傳了 this.state.cate 和 this.state.sort，
// 之後分別用 aa 和 bb 去接，並塞入 category_2nd 和 sort 這兩個變數
// 再對 sort 進行判斷，將結果放入 mysql 語法
// 感謝徐大師和芷儀

router.get('/wine-acce-123/:aa?/:bb?', function (req, res, next) {
  const category_2nd = req.params.aa;
  const sort = req.params.bb;
  let mySort = ''
  // console.log("22222", category_2nd, sort)
  if (sort === 'false') {
    console.log('sor1')
    mySort = ' ORDER BY product_price ASC'
  } else if (sort === 'true') {
    console.log('sor2')
    mySort = ' ORDER BY product_price DESC'
  } else {
    console.log('sor3')
    mySort = ''
  }
  const sql = `SELECT * FROM accessories WHERE category_2nd = "${category_2nd}" ${mySort}`;
  // console.log(sql)

  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})



router.get('/wine-acce-best-brand', function (req, res, next) {
  const sql = "SELECT * FROM `accessories` WHERE `brand` = 'Holmegaard'";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})



// 酒具：商品細節頁
// 因為麵包屑的文字需進行判斷，但需要進行兩張以上資料庫表的互相比對，而且很不巧的這些表都有相同的欄位名稱「sid」，所以會出錯
// mysql 語法大意是，當需要進行撈值時，將 accessories_category_1st 和 accessories_category_2nd 這兩張表的 sid 這欄名稱改掉
// 感謝羅俊和球神

// router.get('/Wine_accessories_detail/:sid', function (req, res, next) {
//   const sid = req.params.sid;
//   console.log("sid" + sid)
//   const sql = `SELECT a.*,b.wendy, b.sid as c1_sid,c.sid as c2_sid,c.ruby FROM accessories as a JOIN  accessories_category_1st b ON b.sid = a.category_1st JOIN accessories_category_2nd  c ON c.sid= a.category_2nd WHERE a.sid='${sid}'`;
//   db.query(sql, [sid], (error, results, fields) => {
//     res.json(results)
//   })
// })

router.get('/Wine_accessories_detail/:sid', function (req, res, next) {
  const sid = req.params.sid;
  let user_id = 1
  let output = {}
  console.log("sid" + sid)
  const sql = `SELECT a.*,b.wendy, b.sid as c1_sid,c.sid as c2_sid,c.ruby FROM accessories as a JOIN  accessories_category_1st b ON b.sid = a.category_1st JOIN accessories_category_2nd  c ON c.sid= a.category_2nd WHERE a.sid='${sid}'`;
  const sql_favorite =
    db.query(sql, [sid], (error, results, fields) => {
      // console.log(fields)\
      console.log(123,results)
      output.acce = results
    })
  db.query(`SELECT product_id FROM favorite_accessories WHERE user_id=${user_id}`, [user_id], (error, results, fields) => {
    output.mylike=results
    console.log(123,results)
    res.json(output)
  })

})

router.post("/Wine_acce_favorite",(req,res)=>{
  let user_id=req.body.user_id
  let storeId=req.body.storeId
  console.log(req.body.storeId)
  if (req.body.mylike) {
    db.queryAsync(
      `DELETE FROM favorite_accessories WHERE user_id =${req.body.user_id} AND product_id=${req.body.storeId}`
    )
      .then(() => {
        return db.queryAsync(
          `SELECT product_id FROM favorite_accessories WHERE user_id =${req.body.user_id}` //user_id要等於前面會員傳進來的值，1要改成變數
        );
      })
      .then((results) => {
        //   console.log(results);
        res.json(results);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } else {
    db.queryAsync(
      `INSERT INTO favorite_accessories VALUES (sid,${req.body.user_id},${req.body.storeId})`
    )
      .then(() => {
        return db.queryAsync(
          `SELECT product_id FROM favorite_accessories WHERE user_id =${req.body.user_id}` //user_id要等於前面會員傳進來的值，1要改成變數
        );
      })
      .then((results) => {
        //   console.log(results);
        res.json(results);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
    }
})


// 酒具：商品細節頁的加入購物車
// 感謝組長
router.post("/temporary_shopping_cart_accessories", (req, res) => {
  let sql = `INSERT INTO temporary_shopping_cart_accessories VALUES (sid,${req.body.member_sid},${req.body.sid},'${req.body.acce_name}',${req.body.acce_qty},${req.body.acce_price})`;
  console.log(sql);
  db.queryAsync(
    sql
  )
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((error) => {
      // console.log(error);
      res.send(error);
    });
});


// 酒具：商品細節頁的隨機推薦商品
router.get('/Wine_detail/rand', function (req, res, next) {
  const sql = "SELECT * from `accessories` order by rand() limit 5";
  db.query(sql, (error, results, fields) => {
    res.json(results)
  })
})


module.exports = router;
