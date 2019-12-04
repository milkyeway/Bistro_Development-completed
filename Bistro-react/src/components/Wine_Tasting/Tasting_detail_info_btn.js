import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_index.scss'
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


class Tasting_detail_info_btn extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
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
        })
    
    
        // 點擊加入購物車後，商品的圖示會飛入購物車
        $(".add_cart_btn").click(function () {
          var cart = $('#icon-cart');
          let imgtodrag = $(".slider-cont>li:eq(0)").children("img");
          console.log(imgtodrag)
          $(imgtodrag).clone().offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
          }).css({
            'opacity': '0.6',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100',
            'border-radius': '50%',
            'object-fit': 'contain'
          }).appendTo($('body'))
            .animate({
              'top': cart.offset().top + 5,
              'left': cart.offset().left + 20,
              'width': 0,
              'height': 0
            }, 2000);
          $("#cart-red-point").css("background-color", "red")
        })
    
  }
  // addNewItemToServer
  render() {
    const shareUrl = 'window.location/localhost:8000/Blog_article';
    const title = 'Bistro';
    return (
      <>
        <div className="social_icon d-flex justify-content-between mt-4">
          <button onClick={this.props.addNewItemToServer()} className="btn add_cart_btn"><img src="../images/Wine_Accessories/icon-cart_brown.png" alt="" />加入購物車</button>
          <button className="btn add_like_btn"><img src="../images/Wine_Accessories/icon-like_fram.png" alt="" />加入最愛</button>
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
export default Tasting_detail_info_btn