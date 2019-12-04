import express from "express";
import db from "../db/database";
import bluebird from "bluebird";
const router = express.Router();
var bird = require("bluebird");
bird.promisifyAll(db);
router.use((req, res, next) => {
  console.log("passed router.use at Carts API ");
  next();
});
const myfunction = (req, res) => {
  let output = {};
  console.log(req.body);
  //每個人像下面取名字並放入results
  db.queryAsync(
    `SELECT * FROM temporary_shopping_cart_allstore WHERE user_id=${req.body.user_id} ORDER BY store_id ASC`
  ).then((results) => {
    //中間可以再插入其他人的sql語法 或是把結果拿出來繼續撈資料
    //output改成陣列比較好
    let i = 0;
    output.bookData = [];
    while (i < results.length) {
      output.bookData = results;
      i++;
      continue;
    }
    let store_id =
      output.bookData.length > 0
        ? output.bookData.map((element) => element.store_id)
        : 0;
    store_id.toString();
    // let m_id = results[0].user_id;
    console.log(123);
    // output.bookData = results[0]; //購物車資訊
    return db
      .queryAsync(
        `SELECT a.name, a.preview_pic FROM allstore a WHERE a.sid IN (${store_id}) ORDER BY a.sid ASC`
      )
      .then((results) => {
        // output.bookData = [...output.bookData, ...results]; //店家資訊
        output.store_info = results;

        //剩下三張表的欄位,以下重複拷貝
        return db
          .queryAsync(
            `SELECT * FROM temporary_shopping_cart_activity WHERE user_id=${req.body.user_id} ORDER BY product_sid ASC`
          )
          .then((results) => {
            let i = 0;
            output.activityData = [];
            while (i < results.length) {
              output.activityData = results;
              i++;
              continue;
            }
            // if( output.activityData.length===0){ }else{}
            // let activity_id =0;
            console.log(output.activityData);

            let activity_id =
              output.activityData.length > 0
                ? output.activityData.map((element) => element.product_sid)
                : 0;

            activity_id.toString();
            // console.log(activity_id);
            // let m_id = results[0].user_id;
            return db
              .queryAsync(
                `SELECT a.activity_name, a.picture FROM activity a WHERE a.sid IN (${activity_id}) ORDER BY a.sid ASC`
              )
              .then((results) => {
                // output.bookData = [...output.bookData, ...results]; //店家資訊
                console.log(166);
                output.activity_info = results;

                //抓酒的資料
                return db
                  .queryAsync(
                    `SELECT * FROM temporary_shopping_cart_wine_goods WHERE user_id=${req.body.user_id} ORDER BY product_sid ASC`
                  )
                  .then((results) => {
                    let i = 0;
                    output.wineData = [];
                    while (i < results.length) {
                      output.wineData = results;
                      i++;
                      continue;
                    }
                    let wine_id =
                      output.wineData.length > 0
                        ? output.wineData.map((element) => element.product_sid)
                        : 0;

                    wine_id.toString();
                    console.log(789);

                    return db
                      .queryAsync(
                        `SELECT a.name, a.my_file FROM wine_goods a WHERE a.sid IN (${wine_id}) ORDER BY a.sid ASC`
                      )
                      .then((results) => {
                        // output.bookData = [...output.bookData, ...results]; //店家資訊
                        console.log(166);
                        output.wine_info = results;

                        //抓酒具的資料
                        return db
                          .queryAsync(
                            `SELECT * FROM temporary_shopping_cart_accessories WHERE user_id=${req.body.user_id} ORDER BY product_sid ASC`
                          )
                          .then((results) => {
                            let i = 0;
                            output.accessoriesData = [];
                            while (i < results.length) {
                              output.accessoriesData = results;
                              i++;
                              continue;
                            }

                            let accessories_id =
                              output.accessoriesData.length > 0
                                ? output.accessoriesData.map(
                                  (element) => element.product_sid
                                )
                                : 0;

                            accessories_id.toString();
                            // let m_id = results[0].user_id;
                            return db
                              .queryAsync(
                                `SELECT a.name, a.product_pic FROM accessories a WHERE a.sid IN (${accessories_id}) ORDER BY a.sid ASC`
                              )
                              .then((results) => {
                                // output.bookData = [...output.bookData, ...results]; //店家資訊
                                console.log(166);
                                output.accessories_info = results;

                                //最後把會員加入表 記得最後.then的閉包要補上
                                return db
                                  .queryAsync(
                                    `SELECT * FROM address_book WHERE member_sid=${req.body.user_id}`
                                  )
                                  .then((results) => {
                                    output.member = results[0]; //會員資訊

                                    return db
                                      .queryAsync(
                                        `SELECT * FROM member_point WHERE member_sid=${req.body.user_id}`
                                      )
                                      .then((results) => {
                                        output.discount = results[0];
                                        console.log(output);
                                        res.json(output);
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
};

router.post("/shopping_cart_detail", (req, res) => {
  //一進網站撈所有的表
  myfunction(req, res);
});

//修正產品數量或是參加人數
router.put("/shopping_cart_detail", (req, res) => {
  // let todo = req.body.count;
  let change = req.body.change;
  let qty = parseInt(req.body.qty);
  let real_num;
  let store_id = req.body.store_id; //這邊設一個變數要放進sql語法裡的
  let act_id = req.body.act_id;
  let wine_id = req.body.wine_id;
  let acc_id = req.body.acc_id;
  // 這邊確認是+還是-傳進來
  const check = () => {
    if (change === "+") {
      real_num = qty + 1;
    } else {
      real_num = qty - 1;
    }
    switch (req.body.dispatch) {
      case "bar": //這邊對應react 裡的data-name 屬性 設定
        return db.queryAsync(
          // `SELECT product_qty FROM temporary_shopping_cart_allstore WHERE user_id=${req.body.user_id}`
          `UPDATE temporary_shopping_cart_allstore SET product_qty = ${real_num}
            WHERE user_id=${req.body.user_id} AND  store_id=${store_id}`
        );
      case "act":
        return db.queryAsync(
          // `SELECT product_qty FROM temporary_shopping_cart_allstore WHERE user_id=${req.body.user_id}`
          `UPDATE temporary_shopping_cart_activity SET product_qty = ${real_num}
                WHERE user_id=${req.body.user_id} AND product_sid=${act_id}`
        );
      case "wine":
        return db.queryAsync(
          // `SELECT product_qty FROM temporary_shopping_cart_allstore WHERE user_id=${req.body.user_id}`
          `UPDATE temporary_shopping_cart_wine_goods SET product_qty = ${real_num}
                WHERE user_id=${req.body.user_id} AND product_sid=${wine_id}`
        );
      case "acc":
        return db.queryAsync(
          // `SELECT product_qty FROM temporary_shopping_cart_allstore WHERE user_id=${req.body.user_id}`
          `UPDATE temporary_shopping_cart_accessories SET product_qty = ${real_num}
                WHERE user_id=${req.body.user_id} AND product_sid=${acc_id}`
        );
      default:
        res.send("無此資料");
    }
  };

  check().then((results) => {
    // console.log(results);
    myfunction(req, res);
  });
});

router.post("/add_cart", (req, res, next) => {
  let a = req.body.store_info;
  let b = req.body.act_info;
  let c = req.body.wine_info;
  let d = req.body.acc_info;
  let e = req.body.member;
  let f = req.body.total;
  let g = req.body.address;
  let h = req.body.message;
  let j = req.body.point;//尚有的點數
  let l = req.body.usecount;//是否使用點數
  let m = Math.round(req.body.total / 50);//這次消費轉換的點數
  let n = req.body.usedpoint;//先前消費的點數
  if (l) {
    //如果使用折價卷
    n = j + n
    j = m
  } else {
    j = j + m
  }
  console.log(f);
  console.log(j);
  //先宣告一個function，才能使用.then()去把結果回傳
  // const order_sql = () => {}; 
  //判斷傳進來的值，下不同的sql
  // 酒吧的訂單資料
  // function store_sql() {
  //   console.log(1);
  //   if (req.body.store_info.length > 0) {
  //     for (let i = 0; i < req.body.store_info.length; i++) {
  //       db.queryAsync(
  //         `INSERT INTO order_list_detail_allstore VALUES (
  //       order_detail_id,
  //       ${req.body.store_info[i].store_id},
  //       ${req.body.store_info[i].product_qty},
  //       '${req.body.store_info[i].product_price}',
  //       '${req.body.store_info[i].name}',
  //       ${req.body.store_info[i].user_id},
  //       '${req.body.store_info[i].time}',
  //       NOW()
  //        )`
  //       );
  //     }
  //   }
  // }
  // 酒的訂單資料
  // function wine_sql() {
  //   console.log(2);
  //   if (req.body.wine_info.length > 0) {
  //     for (let i = 0; i < req.body.wine_info.length; i++) {
  //       db.queryAsync(
  //         `INSERT INTO order_list_detail_wine_goods VALUES (
  //       order_detail_id,
  //       ${req.body.wine_info[i].product_sid},
  //       ${req.body.wine_info[i].product_qty},
  //       ${req.body.wine_info[i].product_price},
  //       '${req.body.wine_info[i].name}',
  //       ${req.body.wine_info[i].user_id},
  //       NOW()
  //       )`
  //       );
  //     }
  //   }
  // }
  // 活動的訂單資料
  // function act_sql() {
  //   console.log(3);
  //   if (req.body.act_info.length > 0) {
  //     for (let i = 0; i < req.body.acc_info.length; i++) {
  //       db.queryAsync(
  //         `INSERT INTO order_list_detail_activity VALUES (
  //   order_detail_id,
  //   ${req.body.act_info[i].product_sid},
  //   ${req.body.act_info[i].product_qty},
  //   ${req.body.act_info[i].product_price},
  //   '${req.body.act_info[i].name}',
  //   ${req.body.act_info[i].user_id},
  //   NOW()
  //     )`
  //       );
  //     }
  //   }
  // }
  // 酒具的訂單資料
  // function acc_sql() {
  //   console.log(4);
  //   console.log("到不了的區塊");
  //   if (req.body.acc_info.length > 0) {
  //     for (let i = 0; i < req.body.acc_info.length; i++) {
  //       db.queryAsync(`INSERT INTO order_list_detail_accessories VALUES (
  //       order_detail_id,
  //       ${req.body.acc_info[i].product_sid},
  //       ${req.body.acc_info[i].product_qty},
  //       ${req.body.acc_info[i].product_price},
  //       '${req.body.acc_info[i].name}',
  //       ${req.body.acc_info[i].user_id},
  //       NOW()
  //       )`);
  //     }
  //   }
  // }
  const output = {};
  //建立訂單總表
  db.queryAsync(
    `INSERT INTO order_list_easy VALUES (
          order_id,
          NOW(),
          ${e.member_sid},
          ${f},
          '${g}',
          '${h}'
          )`
  ).then((results) => {
    output.cartList = results;
    //刪暫存資料表
    return db
      .queryAsync(
        `DELETE FROM temporary_shopping_cart_allstore WHERE user_id=${e.member_sid}`
      )
      .then((results) => {
        return db
          .queryAsync(
            `DELETE FROM temporary_shopping_cart_wine_goods WHERE user_id=${e.member_sid}`
          )
          .then((results) => {
            return db
              .queryAsync(
                `DELETE FROM temporary_shopping_cart_activity WHERE user_id=${e.member_sid}`
              )
              .then((results) => {
                return db
                  .queryAsync(
                    `DELETE FROM temporary_shopping_cart_accessories WHERE user_id=${e.member_sid}`
                  )
                  .then((results) => {
                    //把member_point設為消費點數,用過點數增加
                    return db
                      .queryAsync(
                        `UPDATE member_point SET point=${j} ,used=${n} WHERE member_sid=${e.member_sid}`
                      )
                      .then((results) => {
                        if (a.length > 0) {
                          //酒吧訂單子表
                          console.log(a.length);
                          setTimeout(() => {
                            for (let i = 0; i < a.length; i++) {
                              db.queryAsync(
                                `INSERT INTO order_list_detail_allstore VALUES (
        order_detail_id,
        ${a[i].store_id},
        ${a[i].product_qty},
        '${a[i].product_price}',
        '${a[i].name}',
        ${a[i].user_id},
        '${a[i].time}',
        NOW()
         )`
                              );
                            }
                          }, 300);
                        }

                        if (d.length > 0) {
                          //酒具訂單子表
                          console.log(44);
                          setTimeout(() => {
                            for (let i = 0; i < d.length; i++) {
                              db.queryAsync(
                                `INSERT INTO order_list_detail_accessories VALUES (
          order_detail_id,
          ${d[i].product_sid},
          ${d[i].product_qty},
          ${d[i].product_price},
          '${d[i].name}',
          ${d[i].user_id},
          NOW()
          )`
                              );
                            }
                          }, 1200);
                        }
                        if (c.length > 0) {
                          //酒訂單子表
                          setTimeout(() => {
                            for (let i = 0; i < c.length; i++) {
                              db.queryAsync(
                                `INSERT INTO order_list_detail_wine_goods VALUES (
        order_detail_id,
        ${c[i].product_sid},
        ${c[i].product_qty},
        ${c[i].product_price},
        ${c[i].user_id},
        '${c[i].name}',
        NOW()
        )`
                              );
                            }
                            console.log(25);
                          }, 1600);
                        }

                        if (b.length > 0) {
                          //活動訂單子表
                          setTimeout(() => {
                            for (let i = 0; i < b.length; i++) {
                              db.queryAsync(
                                `INSERT INTO order_list_detail_activity VALUES (
      order_detail_id,
      ${b[i].product_sid},
      ${b[i].product_qty},
      ${b[i].product_price},
      '${b[i].name}',
      ${b[i].user_id},
      NOW() 
        )`
                              );
                            }
                          }, 2300);
                        }
                      });
                  });
              });
          });
      });
  });
  res.json(output);

  // //酒吧
  // if (req.body.store_info.length > 0) {
  //   setTimeout(() => {
  //     for (let i = 0; i < req.body.store_info.length; i++) {
  //       db.queryAsync(
  //         `INSERT INTO order_list_detail_allstore VALUES (
  //         order_detail_id,
  //         ${req.body.store_info[i].store_id},
  //         ${req.body.store_info[i].product_qty},
  //         '${req.body.store_info[i].product_price}',
  //         '${req.body.store_info[i].name}',
  //         ${req.body.store_info[i].user_id},
  //         '${req.body.store_info[i].time}',
  //         NOW()
  //          )`
  //       );
  //     }
  //     console.log(1);
  //   }, 0);
  // }

  // if (req.body.acc_info.length > 0) {
  //   //酒具
  //   setTimeout(() => {
  //     console.log(4);
  //     for (let i = 0; i < req.body.acc_info.length; i++) {
  //       db.queryAsync(
  //         `INSERT INTO order_list_detail_accessories VALUES (
  //       order_detail_id,
  //       ${req.body.acc_info[i].product_sid},
  //       ${req.body.acc_info[i].product_qty},
  //       ${req.body.acc_info[i].product_price},
  //       '${req.body.acc_info[i].name}',
  //       ${req.body.acc_info[i].user_id},
  //       NOW()
  //       )`
  //       );
  //     }
  //   }, 1);
  // }

  // if (req.body.wine_info.length > 0) {
  //   //酒
  //   for (let i = 0; i < req.body.wine_info.length; i++) {
  //     db.queryAsync(
  //       `INSERT INTO order_list_detail_wine_goods VALUES (
  //     order_detail_id,
  //     ${req.body.wine_info[i].product_sid},
  //     ${req.body.wine_info[i].product_qty},
  //     ${req.body.wine_info[i].product_price},
  //     '${req.body.wine_info[i].name}',
  //     ${req.body.wine_info[i].user_id},
  //     NOW()
  //     )`
  //     );
  //   }
  //   console.log(2);
  // }
  // // store_sql();
  // // wine_sql();
  // // act_sql();
  // // acc_sql();
  // // todo餵資料到訂單總表
  // // order_sql();
  // next();
});

router.delete("/delete/cart", (req, res) => {
  let dispatch = req.body.todoDel;
  let user_id = req.body.user_id;
  let product_name = req.body.name;
  let output = {};
  console.log(req.body);
  // console.log(dispatch);
  const deletelist = () => {
    switch (dispatch) {
      case "store":
        db.queryAsync(
          `DELETE FROM temporary_shopping_cart_allstore WHERE user_id=${user_id} AND name='${product_name}'`
        ).then((results) => {
          output.store = results;
        });

      case "wine":
        db.queryAsync(
          `DELETE FROM temporary_shopping_cart_wine_goods WHERE user_id=${user_id} AND name='${product_name}'`
        ).then((results) => {
          output.wine = results;
        });

      case "acc":
        db.queryAsync(
          `DELETE FROM temporary_shopping_cart_accessories WHERE user_id=${user_id} AND name='${product_name}'`
        ).then((results) => {
          output.acc = results;
        });
      case "act":
        db.queryAsync(
          `DELETE FROM temporary_shopping_cart_activity WHERE user_id=${user_id} AND name='${product_name}'`
        ).then((results) => {
          output.act = results;
        });
    }
  };
  deletelist().then((results) => {
    myfunction(req, res);
  });
});

// router.get('/sendorder/:custermerId', (req,res)=>{
//   let custermerId=req.params.custermerId
//  db.queryAsync(`DELETE FROM fm_goods_cart WHERE main_cart = ${custermerId} AND status='購物中'`)
//       .then(
//         db.queryAsync(`DELETE FROM course_cart WHERE main_cart = ${custermerId} AND status='購物中'`)
//       ).then(
//         db.queryAsync(`DELETE FROM dn_goods_cart WHERE main_cart = ${custermerId} AND status='購物中'`)
//       ).then(

//       )
// })

// router.get('/cartsfm/:custermerId', (req,res)=>{
//   let custermerId=req.params.custermerId
//   const sql = `Select * From fm_goods_cart Inner join main_cart on main_cart.cart_id = fm_goods_cart.main_cart JOIN farmer_product on
//   farmer_product.sid = fm_goods_cart.farmer_product Where main_cart = ${custermerId} AND fm_goods_cart.status='購物中'`

//   db.query(sql,(error,results)=>{
//     console.log(error)
//     res.json(results)
//   })
// })

// router.get('/cartcourse/:custermerId', (req,res)=>{
//   let custermerId=req.params.custermerId
//   const sql = `SELECT * FROM course_cart as a JOIN course as b ON a.course = b.course_id JOIN class_room as c ON a.class_room = c.room_sid WHERE main_cart = ${custermerId} AND a.status = '購物中'`

//   db.query(sql,(error,results)=>{
//     console.log(error)
//     res.json(results)
//   })
// })
// router.get('/cartdn/:custermerId', (req,res)=>{
//   let custermerId=req.params.custermerId
//   const sql = `SELECT a.*, b.name as 'restaurant_name', b.cook as 'tip', c.name as 'food_name',
//   c.dinner_image as 'photo', d.name as 'ingredients', e.name as 'product', e.price as 'product_price'
//   FROM dn_goods_cart as a JOIN restaurant as b ON a.restaurant_id = b.restaurant_id
//   JOIN dinner_list as c ON a.dinner_list = c.dinner_id JOIN product_class as d ON a.product_class = d.class_sid
//   JOIN farmer_product as e ON a.farmer_product = e.sid WHERE a.status = '購物中' AND a.main_cart=${custermerId}`

//   db.query(sql,(error,results)=>{
//     console.log(error)
//     res.json(results)
//   })
// })

// router.get('/buyinfor/:custermerId', (req,res)=>{
//   let custermerId=req.params.custermerId
//   const sql = `Select * From post_info join main_cart on main_cart.cart_id = post_info.main_cart Where main_cart = ${custermerId}`

//   db.query(sql,(error,results)=>{
//     console.log(error)
//     res.json(results)
//   })
// })

module.exports = router;
