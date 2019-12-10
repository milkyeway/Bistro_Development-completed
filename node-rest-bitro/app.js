import express from "express";
import bodyparser from "body-parser";
import cors from "cors";


import index from "./api/Index";
import Home from "./api/Home";
import users from './api/Users.js'
import Blog_index from './api/Blog_index.js'
// import goods from "./api/goods";

import session from "express-session";

const app = express();

//session 的 middleware

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "sdasdfasf",
    cookie: {
      maxAge: 1200000
    }
  })
);
//建立白名單
const whitelist = [
  "http://localhost:3000",
  'http://localhost:8000',
  'http://localhost:8001',
  "http://localhost:3306",
  undefined,
]; //undefined 是同一台主機 origin: undefined, 允許的server都放這
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log("origin: " + origin);
    console.log(new Date());
    if (whitelist.indexOf(origin) >= 0) {
      console.log("允許: ");
      callback(null, true); //允許
    } else {
      console.log("不不不不: ");
      // callback(new Error('Not allowed by CORS'));  //這樣用伺服器會直接停掉
      callback(null, false); //不允許 allow-credentials
    }
  }
};
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//設定靜態的資料夾
app.use(express.static("public"));

// app.use("/api/goods", goods);
app.use('/Users', users)                     //登入帳號
// app.use(require(__dirname + "/api/members"));   //地圖
app.use(require(__dirname + "/api/Member_user"));   //會員登入
app.use(require(__dirname + "/api/Index"));     //酒+酒具
app.use(require(__dirname + "/api/Home"));      //首頁
app.use(require(__dirname + "/api/Blog_index"));      //部落格
app.use(require(__dirname + "/api/Latest"));      //活動
app.use(require(__dirname + "/api/DinnerProducts")); //酒吧
app.use(require(__dirname + "/api/Carts"));       //購物車
// app.use(require(__dirname + "/api/Email"));       //Email

app.use(require(__dirname + "/api/order_list_detail_accessories"));      //訂單     
app.use(require(__dirname + "/api/order_list_detail_activity"));       //訂單    
app.use(require(__dirname + "/api/order_list_detail_allstore"));       //訂單    
app.use(require(__dirname + "/api/order_list_detail_wine_goods"));    //訂單       
app.use(require(__dirname + "/api/order_list_easy"));   //訂單    
app.use(require(__dirname + "/api/Latest_minro"));    //撈活動數筆
app.use("/", (req, res, next) => {
  res.send("Hello Express");
});
//if we are here then the specified request is not found
// 未找到的錯誤 - 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//all other requests are not implemented.
// 處理其它還未實作的要求 - 501

app.use((err, req, res, next) => {
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  });
});

module.exports = app;
