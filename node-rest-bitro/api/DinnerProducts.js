//酒吧
const express = require("express");
const mysql = require("mysql");
const multer = require("multer"); //引入上傳檔案
const fs = require("fs"); //寫入檔案
const bluebird = require("bluebird");
const db = mysql.createConnection({
  //等同php 的pdo host連線
  host: 'localhost',
  user: 'YU',
  password: '1234',
  database: 'bistro'
});
bluebird.promisifyAll(db);
db.connect();

const upload = multer({ dest: "tmp_uploads/" }); //上傳檔案的暫存資料夾

const router = express.Router();

//傳送我最愛的商家
router.post("/Dining_bar_favorite", (req, res) => {
  console.log(req.body);
  if (req.body.mylike) {
    db.queryAsync(
      `DELETE FROM favorite_allstore WHERE user_id =${req.body.user_id} AND product_id=${req.body.storeId}`
    )
      .then(() => {
        return db.queryAsync(
          `SELECT product_id FROM favorite_allstore WHERE user_id =${req.body.user_id}` //user_id要等於前面會員傳進來的值，1要改成變數
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
      `INSERT INTO favorite_allstore VALUES (sid,${req.body.user_id},${req.body.storeId})`
    )
      .then(() => {
        return db.queryAsync(
          `SELECT product_id FROM favorite_allstore WHERE user_id =${req.body.user_id}` //user_id要等於前面會員傳進來的值，1要改成變數
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
});

const liks_sql = (value) => {
  // console.log("sql:" + value);
  return db.queryAsync(
    `SELECT product_id FROM favorite_allstore WHERE user_id =${value}` //user_id要等於前面會員傳進來的值，1要改成變數
  );
};
// router.use("/Dining_pub_inquiry/:value?", (req, res, next) => {
//   // let output = {};
//   console.log(req.params);
//   // console.log(req.body);
//   db.queryAsync(
//     `SELECT product_id FROM favorite_allstore WHERE user_id =${req.params.user_id}` //user_id要等於前面會員傳進來的值，1要改成變數
//   ).then((results) => {
//     req.mylike = results[0];
//   });
//   next();
// });

//酒吧的sql
router.get("/Dining_pub_inquiry/:place/:type", (req, res, next) => {
  // const urlParts = url.parse(req.url, true);
  const output = {};
  console.log(12);
  const place = req.params.place;
  // console.log(place);
  let type; //.split(",")[0]
  const type_length = req.params.type.split(",").length;
  //   console.log(type_length);
  if (place && type_length == 1) {
    type = req.params.type.replace(/,/g, " OR "); //.slice(0, -3);
    console.log(type);
    db.queryAsync(
      `SELECT * FROM allstore  a JOIN store_information s ON a.sid= s.sid  WHERE address LIKE '${place}%' AND (${type})`
    )
      .then((results) => {
        output.info = results;
        res.json(output);
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (type_length >= 2) {
    // type = req.params.type.split(",")[0];
    type = req.params.type.replace(/,/g, " OR ");
    console.log(type);
    db.queryAsync(
      `SELECT * FROM allstore a JOIN store_information s ON a.sid= s.sid 
        WHERE address LIKE '${place}%' AND (${type})`
    )
      .then((results) => {
        output.info = results;
        res.json(output);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    next();
  }
});

//單一送過來的路由查詢確認
router.get("/Dining_pub_inquiry/:place", (req, res, next) => {
  // const urlParts = url.parse(req.url, true);
  const urlParts = req.params.place.replace(/,/g, " OR ");

  const output = {};
  if (urlParts.indexOf("市") > 0) {
    //選擇地區
    db.queryAsync(
      `SELECT * FROM allstore a JOIN store_information s ON a.sid= s.sid  WHERE address LIKE '${urlParts}%'`
    )
      .then((results) => {
        console.log(22);
        console.log(results);
        output.info = results;
        res.json(output);
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (/^[\D|null*]/.test(urlParts)) {
    console.log(urlParts);
    //如果選擇餐廳類型
    db.queryAsync(
      `SELECT * FROM allstore a JOIN store_information s ON a.sid= s.sid WHERE ${urlParts}`
    )
      .then((results) => {
        // console.log(123);
        output.info = results;
        res.json(output);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    next();
  }
});

router.get("/Dining_pub_inquiry/:id?", (req, res) => {
  const output = {};
  console.log("none");
  console.log(req.params);
  // console.log(req.session);
  db.queryAsync(
    "SELECT * FROM `allstore` a JOIN `store_information` s ON a.sid= s.sid"
  )
    .then((results) => {
      //   console.log("results", results.length);
      //   console.log(results);
      let i = 0;
      while (i < results.length) {
        output.info = results;
        i++;
        continue;
      }

      //舊的
      // res.json(results);
      //新的
      // return db.queryAsync(
      //   `SELECT product_id FROM favorite_allstore WHERE user_id= ${req.params}` //user_id要等於前面會員傳進來的值，1要改成變數
      // );
      if (req.params.id) {
        return liks_sql(`${req.params.id}`);
      } else {
        console.log(output);
        res.json(output);
        return;
      }
    })
    .then((results) => {
      let i = 0;
      while (i < results.length) {
        output.mylike = results;
        i++;
        continue;
      }
      // console.log(output);
      res.json(output);
    })

    .catch((error) => {
      //   console.log(error);
      res.send(error);
    });
});
// //副篩選
// router.post("/Dining_pub_inquiry", (req, res) => {
//   let filter = req.body.subFilter;
//   let sql_city = filter.city || "*";
//   db.queryAsync(
//     `SELECT * FROM allstore a JOIN store_information s ON a.sid= s.sid WHERE`
//   );
//   // SELECT * FROM allstore a JOIN store_information s ON a.sid= s.sid WHERE `service` LIKE "%夜間叫車%" AND `address` LIKE '台北市%' AND `日式`
//   let sql_type =
//     filter.type.length === 0
//       ? ""
//       : filter.type.map((element) => {
//           return element + " OR ";
//         });

//   console.log(sql_type);
//   console.log(sql_city);
//   res.json(filter);
// });
//測試用
// router.get("/latest_order/:id", (req, res) => {
//   let sid = req.params.id;
//   let output = {};
//   console.log(sid);
//   db.queryAsync(
//     `SELECT * FROM order_list_detail_wine_goods WHERE user_id=${sid}`
//   ).then((results) => {
//     let i = 0;
//     while (i < results.length) {
//       output.store = results;
//       i++;
//       continue;
//     }

//     return db
//       .queryAsync(
//         `SELECT * FROM temporary_shopping_cart_activity WHERE user_id=${sid}`
//       )
//       .then((results) => {
//         let i = 0;
//         while (i < results.length) {
//           output.act = results;
//           i++;
//           continue;
//         }

//         return db
//           .queryAsync(
//             `SELECT * FROM temporary_shopping_cart_wine_goods WHERE user_id=${sid}`
//           )
//           .then((results) => {
//             let i = 0;
//             while (i < results.length) {
//               output.wine = results;
//               i++;
//               continue;
//             }

//             return db
//               .queryAsync(
//                 `SELECT * FROM temporary_shopping_cart_accessories WHERE user_id=${sid}`
//               )
//               .then((results) => {
//                 let i = 0;
//                 while (i < results.length) {
//                   output.acc = results;
//                   i++;
//                   continue;
//                 }

//                 return db.queryAsync(
//                   `SELECT * FROM temporary_shopping_cart_accessories WHERE user_id=${sid}`
//                 );

//                 console.log(output);
//                 res.json(output);
//               });
//           });
//       });
//   });
// });
//

//細節頁加入購物車
router.post("/Dining_bar_detail", (req, res) => {
  // console.log(req);
  let check_id = req.body.storeId.id;
  let check_time = req.body.rv_detail.time;
  // console.log(req);
  // console.log(req.body.sid);
  // console.log(req.body);
  // db.queryAsync(
  //   // SELECT COUNT(`store_id`) FROM `temporary_shopping_cart_allstore` WHERE `store_id`=1
  //   `SELECT COUNT(store_id) FROM temporary_shopping_cart_allstore t WHERE store_id=${check_id} AND store`
  // ).then((results) => {
  //   if (results > 0) {
  //     if(){}
  //   }
  // });

  db.queryAsync(
    `INSERT INTO temporary_shopping_cart_allstore VALUES (sid,'${req.body.name}',${req.body.m_id},${req.body.storeId.id},'${req.body.rv_detail.time}',${req.body.rv_detail.p_num},${req.body.price})`
  )
    //TODO: 333要改成user的id號碼
    // INSERT INTO `temporary_shopping_cart_allstore` VALUES (sid,1,6,'2019/11/13 下午2:39:36',0,550)
    .then((results) => {
      //   console.log(results);
      res.json(results);
    })
    .catch((error) => {
      //   console.log(error);
      res.send(error);
    });
  //   console.log(111222);
});

module.exports = router;
