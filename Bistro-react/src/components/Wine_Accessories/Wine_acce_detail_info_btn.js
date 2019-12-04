import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//分頁連結
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
} from 'react-share';

class Wine_acce_detail_info_btn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      acce_qty: 1,
      sid: '',
      acce_name: '',
      acce_price: '',
    }
  }
  //JQ放這
  componentDidMount() {
    // 加入我的最愛會變字
    $(".add_like_btn").click(function () {
      $(this).toggle()
      $(".add_like_btn_click").toggle()
    })
    $(".add_like_btn_click").click(function () {
      $(this).toggle()
      $(".add_like_btn").toggle()
    })

    // 加入購物車會變字
    $(".add_cart_btn").click(function () {
      $(this).css("color", "var(--text-color)").text("已加入購物車")
      Swal.fire(
        '已加入購物車',
        ' ',
        'success'
      )
    })


    // 點擊加入購物車後，商品的圖示會飛入購物車
    // $(".add_cart_btn").click(function () {
    //   var cart = $('#icon-cart');
    //   let imgtodrag = $(".slider-cont>li:eq(0)").children("img");
    //   console.log(imgtodrag)
    //   $(imgtodrag).clone().offset({
    //     top: imgtodrag.offset().top,
    //     left: imgtodrag.offset().left
    //   }).css({
    //     'opacity': '0.6',
    //     'position': 'absolute',
    //     'height': '150px',
    //     'width': '150px',
    //     'z-index': '100',
    //     'border-radius': '50%',
    //   }).appendTo($('body'))
    //     .animate({
    //       'top': cart.offset().top + 5,
    //       'left': cart.offset().left + 20,
    //       'width': 0,
    //       'height': 0
    //     }, 2000);
    //   $("#cart-red-point").css("background-color", "red")
    // })


  }



  addNewItemToServer = (v) => {
    // console.log('hi:', v)
    const member_sid = localStorage.getItem("member_sid")
    const sid = v.product_sid
    const acce_name = v.name
    const acce_qty = v.product_price
    const acce_price = v.product_qty
    console.log('member_sid:', member_sid)

    let data = {
      member_sid,
      sid,
      acce_name,
      acce_qty,
      acce_price,
    }
    console.log('hi data:', data)

    const url = 'http://localhost:3000/temporary_shopping_cart_accessories'
    this.requestToServer(url, 'POST', data)
  }

  requestToServer = async (url, method, data = {}) => {
    // GET方法不有body，先設定出樣版物件
    const requestTemplate = new Request(url, {
      method: method,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    let req = requestTemplate

    // 如果不是GET再加上body
    if (method !== 'GET')
      req = new Request(requestTemplate, { body: JSON.stringify(data) })

    try {
      const response = await fetch(req)
      const jsonObject = await response.json()
      if (method === 'GET')
        this.setState({
          detail_data: jsonObject,
          // })
          // this.setState({ 
          sid: jsonObject[0].product_sid,
          acce_price: jsonObject[0].product_price,
          acce_name: jsonObject[0].name,
          acce_qty: this.state.product_qty,

        })
      // console.log(jsonObject[0])
    } catch (error) {
      // Error
      this.setState({ result: error })
      console.log('錯誤訊息', error)
    }
  }

  // 我的最愛
  // 還沒抄（改）完
  love = (event) => {
    console.log(this.props)
    let member_sid = localStorage.getItem("member_sid");
    if (member_sid === null) {
      Swal.fire(        
        '請先登入',
        ' ',
        'warning'
      );
    } else {
      fetch("http://localhost:3000/Wine_acce_favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: member_sid,
          storeId: this.props.product_sid,
          mylike: +localStorage.getItem("yishiLike").includes(this.props.product_sid)? true   : false
            
         
          // localStorage裡的資料有沒有包含要傳的數字，有代表要刪掉沒有代表要新增
        })
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === null) {
            alert("若未登入您的最愛店家無法登入");
          } else {
            console.log(json)
            let love_acce = json.map((filter) => {
              return filter.product_id;
            });
            // console.log(typeof love_store[0]);
            localStorage.setItem("yishiLike", love_acce);
            this.setState({ getData: !this.state.getData }); //, sendlike()
          }
        });
    }
    // fetch的網址 /Dining_bar_favorite
  };








  render() {
    const shareUrl = 'window.location/localhost:8000/Blog_article';
    const title = 'Bistro';
    return (
      <>
        <div className="social_icon d-flex justify-content-between mt-4">
          <button className="btn add_cart_btn" onClick={() => this.addNewItemToServer(this.props)}><img src="../images/Wine_Accessories/icon-cart_brown.png" alt="" />加入購物車</button>
          <button className="btn add_like_btn" onClick={() => this.love(this.props)}>
            <img src="../images/Wine_Accessories/icon-like_fram.png" alt="" />加入最愛
          </button>
          <button className="btn add_like_btn_click"><img src="../images/Wine_Accessories/icon-like_orange.png" alt="" />移除最愛</button>
          <div className="share_text d-flex align-items-center">分享：
                <div className="share_icon d-flex">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button mr-1">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
              <LineShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button">
                <LineIcon
                  size={32}
                  round />
              </LineShareButton>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Wine_acce_detail_info_btn