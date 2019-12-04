import React, { useState } from "react";
import "../../style/Shoping/Billing_details.scss";
import Navigation_Navber_noImg from "../Navigation_Navber/Navigation_Navber_noImg";
import Navigation_bg from "../Navigation_Navber/Navigation_bg";
import Footer from "../../components/Navigation_Navber/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from 'sweetalert2'
const Billing_details = (props) => {
  console.log(props);
  let mypath = props.history.location.state;
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const submit = (event) => {
    // console.log(event.target);
    let city = document.getElementsByClassName("country_select ")[0].value;
    console.log(mypath.discount);
    // console.log(city);
    fetch("http://localhost:3000/add_cart", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member: mypath.member,
        store_info: mypath.book,
        act_info: mypath.act_data,
        wine_info: mypath.wineData,
        acc_info: mypath.accData,
        total: mypath.total,
        message: message,
        address: city + address,
        point: mypath.discount.point,
        usedpoint: mypath.discount.used,
        usecount: mypath.usecount
        //這次用的點數加到先前的
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // alert("有傳到後端囉");
        Swal.fire({
          title: '加入成功！',
          timer: 2000
      })
        window.location.replace("http://localhost:8000/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const comment = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };
  const inputAdd = (e) => {
    setAddress(e.target.value);
    console.log(address);
  };
  return (
    <>
      <Navigation_Navber_noImg />
      <Navigation_bg />
      <Container>
        <section className="content_Billing_details">
          <form
            name="checkout"
            className="checkout woocommerce-checkout col-md-12"
          >
            <div
              className="col2-set col-xl-8 col-lg-8 col-md-12 col-sm-12"
              id="customer_details"
            >
              <div className="col-12 col_1">
                <div className="woocommerce-billing-fields">
                  <h3>
                    <font className="vertical-align-inherit">
                      <font className="vertical-align-inherit">結算明細</font>
                    </font>
                  </h3>

                  <p
                    className="form-row form-row form-row-last validate-required"
                    id="billing_last_name_field"
                  >
                    <label for="billing_last_name" className="">
                      姓名
                      <abbr className="required" title="erforderlich">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-text form-control"
                      name="billing_last_name"
                      id="billing_last_name"
                      placeholder=""
                      value={mypath.member.name}
                    />
                  </p>
                  <p
                    className="form-row form-row form-row-first validate-required validate-email"
                    id="billing_email_field"
                  >
                    <label for="billing_email" className="">
                      電子信箱
                      <abbr className="required" title="erforderlich">
                        *
                      </abbr>
                    </label>
                    <input
                      type="email"
                      className="input-text form-control"
                      name="billing_email"
                      id="billing_email"
                      placeholder=""
                      value={mypath.member.email}
                    />
                  </p>
                  <p
                    className="form-row form-row form-row-last validate-required validate-phone"
                    id="billing_phone_field"
                  >
                    <label for="billing_phone" className="">
                      聯絡電話
                      <abbr className="required" title="erforderlich">
                        *
                      </abbr>
                    </label>
                    <input
                      type="tel"
                      className="input-text form-control"
                      name="billing_phone"
                      id="billing_phone"
                      placeholder=""
                      value={mypath.member.mobile}
                    />
                  </p>
                  <p
                    className="form-row form-row form-row-wide address-field update_totals_on_change validate-required"
                    id="billing_country_field"
                  >
                    <label for="billing_country" className="">
                      縣市{" "}
                      <abbr className="required" title="erforderlich">
                        *
                      </abbr>
                    </label>
                    <select
                      name="billing_country"
                      id="billing_country"
                      className="country_to_state country_select "
                    >
                      <option value="台北市">台北市</option>
                      <option value="臺中市">臺中市</option>
                      <option value="基隆市">基隆市</option>
                      <option value="臺南市">臺南市</option>
                      <option value="高雄市">高雄市</option>
                      <option value="新北市">新北市</option>
                      <option value="宜蘭縣">宜蘭縣</option>
                      <option value="桃園市">桃園市</option>
                      <option value="新竹縣">新竹縣</option>
                      <option value="苗栗縣">苗栗縣</option>
                      <option value="南投縣">南投縣</option>
                      <option value="彰化縣">彰化縣</option>
                      <option value="雲林縣">雲林縣</option>
                      <option value="嘉義縣">嘉義縣</option>
                      <option value="屏東縣">屏東縣</option>
                      <option value="花蓮縣">花蓮縣</option>
                      <option value="臺東縣">臺東縣</option>
                      <option value="澎湖縣">澎湖縣</option>
                      <option value="金門縣">金門縣</option>
                      <option value="連江縣">連江縣</option>
                      <option value="嘉義市">嘉義市</option>
                      <option value="新竹市">新竹市</option>
                    </select>
                    <noscript>
                      <input
                        type="text"
                        name="woocommerce_checkout_update_totals"
                      />
                    </noscript>
                  </p>
                  <p
                    className="form-row form-row form-row-wide address-field validate-required"
                    id="billing_address_1_field"
                  >
                    <label for="billing_address_1" className="">
                      地址{" "}
                      <abbr className="required" title="erforderlich">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-text form-control address"
                      name="billing_address_1"
                      id="billing_address_1"
                      defaultValue=""
                      placeholder="請輸入詳細地址"
                      onKeyUp={inputAdd}
                    />
                  </p>
                  {/* <p className="form-row form-row-wide create-account">
                    <input
                      className="input-checkbox form-control"
                      id="createaccount"
                      type="checkbox"
                      name="createaccount"
                      value="1"
                    />
                    <label for="createaccount" className="checkbox">
                      創造新的帳戶?
                    </label>
                  </p> */}
                </div>
              </div>
              <div className="col-12 col_2">
                <div className="woocommerce-shipping-fields">
                  <h3>附加訊息</h3>
                  <p
                    className="form-row form-row notes"
                    id="order_comments_field"
                  >
                    <label
                      for="order_comments"
                      className="order_comments_label"
                    >
                      <font className="order_comments_text">對訂單的評論</font>
                    </label>
                    <textarea
                      name="order_comments"
                      className="input-text form-control"
                      id="order_comments"
                      placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung."
                      rows="2"
                      cols="5"
                      onKeyUp={comment}
                    ></textarea>
                  </p>
                </div>
              </div>
            </div>
            {/* 確認定單 */}
            <div
              id="order_review"
              className="woocommerce-checkout-review-order col-xl-4 col-lg-4 col-md-12 col-sm-12"
            >
              <h3 id="order_review_heading">訂單確認</h3>
              <table className="shop_table woocommerce-checkout-review-order-table">
                <thead>
                  <tr>
                    <th className="product-name">名稱</th>
                  </tr>
                </thead>
                <tbody>
                  {mypath.book.map((arr, i) => {
                    return (
                      <tr className="cart_item">
                        {arr.name} x <small>{arr.product_qty}</small>
                        <span className="amount">
                          <small> &nbsp; {arr.product_price}</small>{" "}
                        </span>
                      </tr>
                    );
                  })}
                  {mypath.act_data.map((arr, i) => {
                    return (
                      <tr className="cart_item">
                        {arr.name} x <small>{arr.product_qty}</small>
                        <span className="amount">
                          <small> &nbsp; {arr.product_price}</small>{" "}
                        </span>
                      </tr>
                    );
                  })}
                  {mypath.wineData.map((arr, i) => {
                    return (
                      <tr className="cart_item">
                        {arr.name} x <small>{arr.product_qty}</small> /
                        <span className="amount">
                          <small>{arr.product_price}</small>{" "}
                        </span>
                      </tr>
                    );
                  })}
                  {mypath.accData.map((arr, i) => {
                    return (
                      <tr className="cart_item">
                        {arr.name} x <small>{arr.product_qty}</small> /
                        <span className="amount">
                          <small>{arr.product_price}</small>{" "}
                        </span>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="cart-subtotal">
                    <th>小計</th>
                    <td>
                      <span className="woocommerce-Price-amount amount">
                        {mypath.total}
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
                    <th>總額</th>
                    <td>
                      <strong>
                        <span className="woocommerce-Price-amount amount">
                          {mypath.total + 150}元
                          {/* <span className="woocommerce-Price-currencySymbol">
                            &euro;
                          </span> */}
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <input type="hidden" name="lang" value="en" />
              <div id="payment" className="woocommerce-checkout-payment">
                <div className="form-row place-order">
                  <button
                    className="button alt button_alt"
                    name="woocommerce_checkout_place_order"
                    id="place_order"
                    onClick={submit}
                  >
                    送出訂單資料
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </Container>
      <Footer />
    </>
  );
};
export default Billing_details;
