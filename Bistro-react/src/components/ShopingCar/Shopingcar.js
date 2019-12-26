import React, { useEffect, useState, useCallback } from "react";
import "../../style/Shoping/Shopingcar.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";
import { set } from "date-fns";
// import Carousel from '../components/Navigation_Navber/Carousel'
// import Shoping_store from "./Shoping_store";

const Shopingcar = () => {
  //儲存fetch的member資料
  const [member, setMember] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [usecount, setUsecount] = useState(false);
  //商店的狀態
  const [info, setInfo] = useState([]);
  const [book, setBook] = useState([]);
  const [store_id, setStore_id] = useState(0);
  const [count, setCount] = useState(1);
  const [toggle, setToggle] = useState(true);
  const [errors, setErrors] = useState(null);
  // 活動的狀態
  const [act_info, setAct_info] = useState([]);
  const [act_data, setAct_data] = useState([]);
  const [act_id, setAct_id] = useState(0);

  //酒的狀態
  const [wine_info, setWine_info] = useState([]);
  const [wineData, setWineData] = useState([]);
  const [wine_id, setWine_id] = useState(0);

  //酒具的狀態
  const [acc_info, setAcc_info] = useState([]);
  const [accData, setAccData] = useState([]);
  const [acc_id, setAcc_id] = useState(0);

  const fetchData = useCallback((sid) => {
    console.log(sid);
    fetch("http://localhost:3000/shopping_cart_detail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: sid })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        //酒吧資料設定狀態
        setInfo(res.store_info);
        setBook(res.bookData);
        //活動資料設定狀態
        setAct_info(res.activity_info);
        setAct_data(res.activityData);
        //酒資料設定狀態
        setWine_info(res.wine_info);
        setWineData(res.wineData);
        //酒具設定資料
        setAcc_info(res.accessories_info);
        setAccData(res.accessoriesData);
        //會員資料
        setMember(res.member);
        setDiscount(res.discount);
      })
      .catch((err) => setErrors(err));
  }, []);

  //酒吧更改function
  const bar_handleCount = (store_id, i) => (e) => {
    // console.log(e.target);
    console.log(count);
    let now_qty = document.getElementsByClassName("qty")[i].value;
    console.log(now_qty);
    let name = e.target.dataset.name;
    setStore_id(store_id);
    // setCount(count + 1,[count]);
    fetch("http://localhost:3000/shopping_cart_detail", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sid,
        change: e.target.value,
        qty: now_qty,
        dispatch: name,
        store_id: store_id
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setToggle(!toggle);
        fetchData(toggle);
      });
  };
  //重要!!!!!!!!尚未調整的
  // ctrl+f img 標籤改成自己的路徑
  //活動更改function
  //閉包最外層會往裡面傳兩層，e代表的是這個物件，不會有值

  const activity_handleCount = (act_id, i) => (e) => {
    //下面雖然是store_id但其實是各產品的sid 這邊用act_id取代
    // console.log(e.target);

    let now_qty = document.getElementsByClassName("act_qty")[i].value; //取classname名字
    let name = e.target.dataset.name; //ctrl+f 找data-name
    setAct_id(act_id);
    // setCount(count + 1,[count]);
    fetch("http://localhost:3000/shopping_cart_detail", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sid,
        change: e.target.value,
        qty: now_qty,
        dispatch: name,
        act_id: act_id
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setToggle(!toggle);
        fetchData(toggle);
      });
  };

  // 酒的更改
  const wine_handleCount = (wine_id, i) => (e) => {
    let now_qty = document.getElementsByClassName("wine_qty")[i].value; //取classname名字
    let name = e.target.dataset.name; //ctrl+f 找data-name
    setWine_id(wine_id);
    // setCount(count + 1,[count]);
    fetch("http://localhost:3000/shopping_cart_detail", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sid,
        change: e.target.value,
        qty: now_qty,
        dispatch: name,
        wine_id: wine_id
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setToggle(!toggle);
        fetchData(toggle);
      });
  };
  //酒具的修改
  const acc_handleCount = (acc_id, i) => (e) => {
    let now_qty = document.getElementsByClassName("acc_qty")[i].value; //取classname名字
    let name = e.target.dataset.name; //ctrl+f 找data-name
    setAcc_id(acc_id);
    // setCount(count + 1,[count]);
    fetch("http://localhost:3000/shopping_cart_detail", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: sid,
        change: e.target.value,
        qty: now_qty,
        dispatch: name,
        acc_id: acc_id
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setToggle(!toggle);
        fetchData(toggle);
      });
  };

  //每個人要設定自己的function 跟鉤子才不會衝突到
  // const showSrc = (arr) => {
  //   console.log(arr);
  //   console.log(arr[arr.length - 1]);
  //   return arr[arr.length - 1].map((ele) => "images/" + ele.preview_pic);
  // };
  // console.log(book);
  // console.log(info);
  // console.log(count);
  let sid = parseInt(localStorage.getItem("member_sid")) || null;
  useEffect(
    () => {
      let sid = parseInt(localStorage.getItem("member_sid")) || null;
      fetchData(sid);
    },
    // console.log(sid);
    [fetchData]
  );

  const myTotal = () => {
    // 先把後端跟價格相關的資料撈出
    let a = book.map((arr, i) => {
      return arr.product_price * arr.product_qty;
    });
    let b = act_data.map((arr, i) => {
      return arr.product_price * arr.product_qty;
    });
    let c = wineData.map((arr, i) => {
      return arr.product_price * arr.product_qty;
    });
    let d = accData.map((arr, i) => {
      return arr.product_price * arr.product_qty;
    });
    // reducer 累加陣列的值，如果未加入購物車要給預設值0
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let a_price = a.length > 0 ? a.reduce(reducer) : 0;
    let b_price = b.length > 0 ? b.reduce(reducer) : 0;
    let c_price = c.length > 0 ? c.reduce(reducer) : 0;
    let d_price = d.length > 0 ? d.reduce(reducer) : 0;

    let total = usecount
      ? a_price + b_price + c_price + d_price - discount.point
      : a_price + b_price + c_price + d_price;
    return total;
    // console.log(total);
  };

  const deleteList = (item, name) => () => {
    // console.log(member.member_sid);
    fetch("http://localhost:3000/delete/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todoDel: item,
        user_id: member.member_sid,
        name: name
      })
    })
      .then((res) => res.json())
      .then((json) => {
        fetchData();
      });
  };

  const check_discount = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUsecount(!usecount);
    console.log(e.target);
  };

  if (sid === null) return "請先登入會員";
  // console.log(results);
  return (
    <>
      <section className="content_shoping">
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <article className="">
                <div className="entry-content">
                  <div className="woocommerce">
                    <div className="woocommerce-notices-wrapper"></div>
                    <form
                      className="woocommerce-cart-form text-align-center"
                      action="#"
                      method="post"
                    >
                      {/* bar_handleCount={bar_handleCount(arr.store_id, i)} */}
                      {/* info */}
                      {/* book */}
                      {/* 拆元件起始 */}
                      <div
                        className="shop_title d-flex"
                        style={{ "justify-content": "space-around" }}
                      >
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6>店家名稱</h6>
                        </div>
                        <div>
                          <h6>預約時間</h6>
                        </div>
                        <div>
                          <h6>用餐人數</h6>
                        </div>
                        <div>
                          <h6>價格</h6>
                        </div>
                      </div>
                      <div className="product_info d-flex">
                        <div
                          className="d-flex cart_left_wrap"
                          style={{
                            "flex-direction": "column",
                            width: "50%"
                          }}
                        >
                          {info.map((arr) => {
                            return (
                              <div
                                className="d-flex cart-left"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  margin: "30px 20px"
                                }}
                              >
                                <a
                                  href="#"
                                  className="remove"
                                  aria-label="Remove this item"
                                  data-product_id="682"
                                  data-product_sku=""
                                  style={{
                                    display: "block",
                                    "margin-left": "30px"
                                  }}
                                  onClick={deleteList("store", arr.name)}
                                >
                                  &times;
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block"
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "200px",
                                      height: "140px",
                                      "over-flow": "hidden"
                                    }}
                                  >
                                    <img
                                      width="100%"
                                      height="100%"
                                      src={"images/" + arr.preview_pic}
                                      className="attachment-9999x300 size-9999x300"
                                      style={{ "object-fit": "cover" }}
                                      alt=""
                                    />
                                  </div>
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block",
                                    margin: "30px",
                                    width: "23%",
                                    "text-overflow": "ellipis"
                                  }}
                                  alt={arr.name}
                                >
                                  {/* {arr[arr.length - 1].map(
                                      (ele) => ele.preview_pic
                                    )} */}
                                  {arr.name}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="d-flex cart_right_wrap"
                          style={{
                            "flex-direction": "column",
                            "justify-content": "space-around",
                            width: "50%"
                          }}
                        >
                          {book.map((arr, i) => {
                            return (
                              <div
                                className="d-flex cart_right"
                                style={{
                                  "align-items": "center",
                                  margin: "30px 20px",
                                  "justify-content": "space-around"
                                }}
                              >
                                <span className="woocommerce-Price-amount amount">
                                  {arr.time}
                                </span>
                                <div
                                  className="quantity buttons_added"
                                  style={{ display: "flex" }}
                                >
                                  <input
                                    type="button"
                                    value="-"
                                    className="minus"
                                    data-name="bar"
                                    onClick={bar_handleCount(arr.store_id, i)}
                                  ></input>
                                  <label
                                    className="screen-reader-text"
                                    for="quantity_5dcb88c341594"
                                  ></label>
                                  <input
                                    type="number"
                                    id="quantity_5dcb88c341594"
                                    className="input-text qty text"
                                    step="1"
                                    min="0"
                                    max
                                    value={arr.product_qty}
                                    title="Qty"
                                    size="4"
                                    inputmode="ntmeric"
                                    style={{ width: "30px" }}
                                  ></input>
                                  <input
                                    type="button"
                                    value="+"
                                    className="plus"
                                    data-name="bar"
                                    onClick={bar_handleCount(arr.store_id, i)}
                                  ></input>
                                </div>
                                <span
                                  className="woocommerce-Price-amount amount subtotal"
                                  style={{ margin: "10px" }}
                                >
                                  {count === undefined
                                    ? "...計算中"
                                    : arr.product_price * arr.product_qty}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 拆元件結束 */}

                      {/* 活動元件範例 */}
                      <div
                        className="shop_title d-flex"
                        style={{ "justify-content": "space-around" }}
                      >
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6>活動名稱</h6>
                        </div>
                        <div>
                          <h6>參加人數</h6>
                        </div>
                        <div>
                          <h6> </h6>
                        </div>
                        <div>
                          <h6>價格</h6>
                        </div>
                      </div>
                      <div className="product_info d-flex">
                        <div
                          className="d-flex cart_left_wrap"
                          style={{
                            "flex-direction": "column",
                            width: "50%"
                          }}
                        >
                          {act_info.map((arr) => {
                            return (
                              <div
                                className="d-flex cart-left"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  margin: "30px 20px"
                                }}
                              >
                                <a
                                  href="#"
                                  className="remove"
                                  aria-label="Remove this item"
                                  data-product_id="682"
                                  data-product_sku=""
                                  style={{
                                    display: "block",
                                    "margin-left": "30px"
                                  }}
                                  onClick={deleteList("act", arr.activity_name)}
                                >
                                  &times;
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block"
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "200px",
                                      height: "140px",
                                      "over-flow": "hidden"
                                    }}
                                  >
                                    <img
                                      width="100%"
                                      height="100%"
                                      src={
                                        "images/activity/" +
                                        JSON.parse(arr.picture)
                                      }
                                      className="attachment-9999x300 size-9999x300"
                                      style={{ "object-fit": "cover" }}
                                      alt=""
                                    />
                                  </div>
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block",
                                    margin: "30px",
                                    width: "23%",
                                    "text-overflow": "ellipis"
                                  }}
                                  alt={arr.activity_name}
                                >
                                  {/* {arr[arr.length - 1].map(
                                      (ele) => ele.preview_pic
                                    )} */}
                                  {arr.activity_name}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="d-flex cart_right_wrap"
                          style={{
                            "flex-direction": "column",
                            "justify-content": "space-around",
                            width: "50%"
                          }}
                        >
                          {act_data.map((arr, i) => {
                            return (
                              <div
                                className="d-flex cart_right"
                                style={{
                                  "align-items": "center",
                                  margin: "30px 20px",
                                  "justify-content": "space-around"
                                }}
                              >
                                <div
                                  className="quantity buttons_added"
                                  style={{ display: "flex" }}
                                >
                                  <input
                                    type="button"
                                    value="-"
                                    className="minus"
                                    data-name="act"
                                    onClick={activity_handleCount(
                                      arr.product_sid,
                                      i
                                    )}
                                  ></input>
                                  <label
                                    className="screen-reader-text"
                                    for="quantity_5dcb88c341594"
                                  ></label>
                                  <input
                                    type="number"
                                    id="quantity_5dcb88c341594"
                                    className="input-text act_qty text"
                                    step="1"
                                    min="0"
                                    max
                                    value={arr.product_qty}
                                    title="Qty"
                                    size="4"
                                    inputmode="ntmeric"
                                    style={{ width: "30px" }}
                                  ></input>
                                  <input
                                    type="button"
                                    value="+"
                                    className="plus"
                                    data-name="act"
                                    onClick={activity_handleCount(
                                      arr.product_sid,
                                      i
                                    )}
                                  ></input>
                                </div>
                                <span
                                  style={{
                                    display: "block",
                                    width: "30%"
                                  }}
                                ></span>
                                <span
                                  className="woocommerce-Price-amount amount subtotal"
                                  style={{ margin: "10px" }}
                                >
                                  {count === undefined
                                    ? "...計算中"
                                    : arr.product_price * arr.product_qty}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* 活動元件結束 */}
                      {/* 酒元件開始 */}
                      <div
                        className="shop_title d-flex"
                        style={{ "justify-content": "space-around" }}
                      >
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6>酒品名稱</h6>
                        </div>
                        <div>
                          <h6>商品數量</h6>
                        </div>
                        <div>
                          <h6> </h6>
                        </div>
                        <div>
                          <h6>價格</h6>
                        </div>
                      </div>
                      <div className="product_info d-flex">
                        <div
                          className="d-flex cart_left_wrap"
                          style={{
                            "flex-direction": "column",
                            width: "50%"
                          }}
                        >
                          {wine_info.map((arr) => {
                            return (
                              <div
                                className="d-flex cart-left"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  margin: "30px 20px"
                                }}
                              >
                                <a
                                  href="#"
                                  className="remove"
                                  aria-label="Remove this item"
                                  data-product_id="682"
                                  data-product_sku=""
                                  style={{
                                    display: "block",
                                    "margin-left": "30px"
                                  }}
                                  onClick={deleteList("wine", arr.name)}
                                >
                                  &times;
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block"
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "200px",
                                      height: "140px",
                                      "over-flow": "hidden"
                                    }}
                                  >
                                    <img
                                      width="100%"
                                      height="100%"
                                      src={"images/wine/" + arr.my_file}
                                      className="attachment-9999x300 size-9999x300"
                                      style={{ "object-fit": "contain" }}
                                      alt=""
                                    />
                                  </div>
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block",
                                    margin: "30px",
                                    width: "23%",
                                    "text-overflow": "ellipis"
                                  }}
                                  alt={arr.name}
                                >
                                  {/* {arr[arr.length - 1].map(
                                      (ele) => ele.preview_pic
                                    )} */}
                                  {arr.name}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="d-flex cart_right_wrap"
                          style={{
                            "flex-direction": "column",
                            "justify-content": "space-around",
                            width: "50%"
                          }}
                        >
                          {wineData.map((arr, i) => {
                            return (
                              <div
                                className="d-flex cart_right"
                                style={{
                                  "align-items": "center",
                                  margin: "30px 20px",
                                  "justify-content": "space-around"
                                }}
                              >
                                <div
                                  className="quantity buttons_added"
                                  style={{ display: "flex" }}
                                >
                                  <input
                                    type="button"
                                    value="-"
                                    className="minus"
                                    data-name="wine"
                                    onClick={wine_handleCount(
                                      arr.product_sid,
                                      i
                                    )}
                                  ></input>
                                  <label
                                    className="screen-reader-text"
                                    for="quantity_5dcb88c341594"
                                  ></label>
                                  <input
                                    type="number"
                                    id="quantity_5dcb88c341594"
                                    className="input-text wine_qty text"
                                    step="1"
                                    min="0"
                                    max
                                    value={arr.product_qty}
                                    title="Qty"
                                    size="4"
                                    inputmode="ntmeric"
                                    style={{ width: "30px" }}
                                  ></input>
                                  <input
                                    type="button"
                                    value="+"
                                    className="plus"
                                    data-name="wine"
                                    onClick={wine_handleCount(
                                      arr.product_sid,
                                      i
                                    )}
                                  ></input>
                                </div>
                                <span
                                  style={{
                                    display: "block",
                                    width: "30%"
                                  }}
                                ></span>
                                <span
                                  className="woocommerce-Price-amount amount subtotal"
                                  style={{ margin: "10px" }}
                                >
                                  {count === undefined
                                    ? "...計算中"
                                    : arr.product_price * arr.product_qty}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 酒元件結束 */}
                      {/* 酒具元件開始 */}
                      <div
                        className="shop_title d-flex"
                        style={{ "justify-content": "space-around" }}
                      >
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6></h6>
                        </div>
                        <div>
                          <h6>酒具名稱</h6>
                        </div>
                        <div>
                          <h6>商品數量</h6>
                        </div>
                        <div>
                          <h6> </h6>
                        </div>
                        <div>
                          <h6>價格</h6>
                        </div>
                      </div>
                      <div className="product_info d-flex">
                        <div
                          className="d-flex cart_left_wrap"
                          style={{
                            "flex-direction": "column",
                            width: "50%"
                          }}
                        >
                          {acc_info.map((arr) => {
                            return (
                              <div
                                className="d-flex cart-left"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  margin: "30px 20px"
                                }}
                              >
                                <a
                                  href="#"
                                  className="remove"
                                  aria-label="Remove this item"
                                  data-product_id="682"
                                  data-product_sku=""
                                  style={{
                                    display: "block",
                                    "margin-left": "30px"
                                  }}
                                  onClick={deleteList("acc", arr.name)}
                                >
                                  &times;
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block"
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "200px",
                                      height: "140px",
                                      "over-flow": "hidden"
                                    }}
                                  >
                                    <img
                                      width="100%"
                                      height="100%"
                                      src={"images/acce/" + arr.product_pic}
                                      className="attachment-9999x300 size-9999x300"
                                      style={{ "object-fit": "cover" }}
                                      alt=""
                                    />
                                  </div>
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    display: "inline-block",
                                    margin: "30px",
                                    width: "23%",
                                    "text-overflow": "ellipis"
                                  }}
                                  alt={arr.name}
                                >
                                  {/* {arr[arr.length - 1].map(
                                      (ele) => ele.preview_pic
                                    )} */}
                                  {arr.name}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="d-flex cart_right_wrap"
                          style={{
                            "flex-direction": "column",
                            "justify-content": "space-around",
                            width: "50%"
                          }}
                        >
                          {accData.map((arr, i) => {
                            return (
                              <div
                                className="d-flex cart_right"
                                style={{
                                  "align-items": "center",
                                  margin: "30px 20px",
                                  "justify-content": "space-around"
                                }}
                              >
                                <div
                                  className="quantity buttons_added"
                                  style={{ display: "flex" }}
                                >
                                  <input
                                    type="button"
                                    value="-"
                                    className="minus"
                                    data-name="acc"
                                    onClick={acc_handleCount(
                                      arr.product_sid,
                                      i
                                    )}
                                  ></input>
                                  <label
                                    className="screen-reader-text"
                                    for="quantity_5dcb88c341594"
                                  ></label>
                                  <input
                                    type="number"
                                    id="quantity_5dcb88c341594"
                                    className="input-text acc_qty text"
                                    step="1"
                                    min="0"
                                    max
                                    value={arr.product_qty}
                                    title="Qty"
                                    size="4"
                                    inputmode="ntmeric"
                                    style={{ width: "30px" }}
                                  ></input>
                                  <input
                                    type="button"
                                    value="+"
                                    className="plus"
                                    data-name="acc"
                                    onClick={acc_handleCount(
                                      arr.product_sid,
                                      i
                                    )}
                                  ></input>
                                </div>
                                <span
                                  style={{
                                    display: "block",
                                    width: "30%"
                                  }}
                                ></span>
                                <span
                                  className="woocommerce-Price-amount amount subtotal"
                                  style={{ margin: "10px" }}
                                >
                                  {count === undefined
                                    ? "...計算中"
                                    : arr.product_price * arr.product_qty}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 酒具元件結束 */}

                      <Col md={12} className="cart-collaterals">
                        {/* 你可能會有興趣商品 */}
                        {/* <div className="cross-sells">
                         
                          <Row>
                            <ul className="products">
                              <li className="col-xl-6 col-xs-12 col-sm-12 col-md-12 post-686 product type-product status-publish has-post-thumbnail product_cat-white-wines member-discount discount-restricted first instock shipping-taxable purchasable product-type-simple">
                                <a
                                  href="#"
                                  className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                >
                                  <h2 className="woocommerce-loop-product__title">
                                    Villenoir Riesling
                                  </h2>
                                  <div className="gg-product-image-wrapper">
                                    <img
                                      width="1400"
                                      height="2225"
                                      src="http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Riesling-w-cup.png"
                                      className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                      alt=""
                                      srcset="http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Riesling-w-cup.png 1400w, http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Riesling-w-cup-189x300.png 189w, http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Riesling-w-cup-768x1221.png 768w, http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Riesling-w-cup-644x1024.png 644w"
                                      sizes="(max-width: 1400px) 100vw, 1400px"
                                    />
                                  </div>
                                </a>
                                <div className="gg-product-meta-wrapper">
                                  <dl>
                                    <dt>Year</dt>
                                    <dd>
                                      <span className="year">2012</span>
                                    </dd>
                                    <dt>Price </dt>
                                    <dd>
                                      <span className="price">
                                        <span className="woocommerce-Price-amount amount">
                                          165,00&nbsp;
                                          <span className="woocommerce-Price-currencySymbol">
                                            &euro;
                                          </span>
                                        </span>
                                      </span>
                                    </dd>
                                  </dl>
                                  <a
                                    href="#"
                                    data-quantity="1"
                                    className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                                    data-product_id="686"
                                    data-product_sku=""
                                    aria-label="Add &ldquo;Villenoir Riesling&rdquo; to your cart"
                                    rel="nofollow"
                                  >
                                    Add to cart
                                  </a>
                                </div>
                              </li>
                              <li className="col-xl-6 col-xs-12 col-sm-12 col-md-12 post-684 product type-product status-publish has-post-thumbnail product_cat-white-wines member-discount discount-restricted last instock shipping-taxable purchasable product-type-simple">
                                <a
                                  href="#"
                                  className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                >
                                  <h2 className="woocommerce-loop-product__title">
                                    Villenoir Chardonnay
                                  </h2>
                                  <div className="gg-product-image-wrapper">
                                    <img
                                      width="1400"
                                      height="2225"
                                      src="http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Chardonnay-w-cup.png"
                                      className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                      alt=""
                                      srcset="http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Chardonnay-w-cup.png 1400w, http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Chardonnay-w-cup-189x300.png 189w, http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Chardonnay-w-cup-768x1221.png 768w, http://okthemes.com/villenoir/wp-content/uploads/2016/03/White-Chardonnay-w-cup-644x1024.png 644w"
                                      sizes="(max-width: 1400px) 100vw, 1400px"
                                    />
                                  </div>
                                </a>
                                <div className="gg-product-meta-wrapper">
                                  <dl>
                                    <dt>Year </dt>
                                    <dd>
                                      <span className="year">2014</span>
                                    </dd>

                                    <dt>Price </dt>
                                    <dd>
                                      <span className="price">
                                        <span className="woocommerce-Price-amount amount">
                                          236,00&nbsp;
                                          <span className="woocommerce-Price-currencySymbol">
                                            &euro;
                                          </span>
                                        </span>
                                      </span>
                                    </dd>
                                  </dl>
                                  <a
                                    href="#"
                                    data-quantity="1"
                                    className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                                    data-product_id="684"
                                    data-product_sku=""
                                    aria-label="Add &ldquo;Villenoir Chardonnay&rdquo; to your cart"
                                    rel="nofollow"
                                  >
                                    Add to cart
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </Row>
                        </div> */}
                        {/* 購物車價格資訊 */}
                        <div className="cart_totals ">
                          <h2>購物車總額</h2>
                          <table
                            cellspacing="0"
                            className="shop_table shop_table_responsive"
                          >
                            <tr className="cart-subtotal">
                              <th>小計</th>
                              <td data-title="Subtotal">
                                <span className="woocommerce-Price-amount amount">
                                  <span className="woocommerce-Price-currencySymbol">
                                    {myTotal()}元
                                  </span>
                                </span>
                              </td>
                            </tr>
                            <tr className="woocommerce-shipping-totals shipping">
                              <th>運費</th>
                              <td data-title="Shipping">
                                <ul
                                  id="shipping_method"
                                  className="woocommerce-shipping-methods"
                                >
                                  <li>
                                    <input
                                      type="hidden"
                                      name="shipping_method[0]"
                                      data-index="0"
                                      id="shipping_method_0_flat_rate3"
                                      value="flat_rate:3"
                                      className="shipping_method"
                                    />
                                    <label for="shipping_method_0_flat_rate3">
                                      <span className="woocommerce-Price-amount amount">
                                        150元
                                      </span>
                                    </label>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr className="order-total">
                              <th>Total</th>
                              <td data-title="Total">
                                <strong>
                                  <span className="woocommerce-Price-amount amount">
                                    {myTotal() + 150}元
                                    {/* <span className="woocommerce-Price-currencySymbol"></span> */}
                                  </span>
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="shop_redcart_td">
                                <button
                                  onClick={check_discount}
                                  className="shop_redcart"
                                >
                                  確認使用紅點
                                </button>
                                <small>紅利點數(50元1點)</small>{" "}
                                <div>{usecount ? 0 : discount.point}點</div>
                              </td>
                            </tr>
                          </table>
                          <div className="d-flex">
                            <div className="wc-proceed-to-checkout">
                              <Link
                                to={{
                                  pathname: "/ShopingCar/Billing_details",
                                  state: {
                                    info,
                                    book,
                                    act_data,
                                    wineData,
                                    accData,
                                    total: myTotal(),
                                    member,
                                    discount,
                                    usecount
                                  }
                                }}
                                className="checkout-button button alt wc-forward"
                              >
                                確定結帳
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </form>
                  </div>
                </div>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Shopingcar;
