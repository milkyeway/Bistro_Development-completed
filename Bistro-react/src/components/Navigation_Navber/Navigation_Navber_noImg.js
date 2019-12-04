import React from 'react'
//樣式
import '../../style/Home.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
// import Shoping from '../../components/ShopingCar/Shoping'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import $ from 'jquery'
//會員連結

import Login_register from '../../pages/Login_register'
//會員連結

//類別型元件
class Navigation_Navber_noImg extends React.Component {
    constructor(props) {
        super(props)
        const Swal = require('sweetalert2')
        // 會員用預先狀態
        //控制是否為登入狀態的應用程式領域的狀態(指isAuth這個狀態)
        this.state = {
            isAuth: false,
            //會員用
        }
    }

    //會員用登入登出JS 起頭
    // 進行登入
    authenticate = callback => {
        this.setState({ isAuth: true }, () => setTimeout(callback, 300))

    }
    //authenticate是什麼?這串程式的意思是說登入後切換state值並在0.3s跳轉嗎? callback

    // 進行登出
    signout = callback => {
        this.setState({ isAuth: false }, () => setTimeout(callback, 300))
        localStorage.removeItem('member_sid');
        localStorage.removeItem('member_name');
        localStorage.removeItem('barLike');
        Swal.fire(
            '您已登出',
            '',
            'success'
        )
        //   <Link to="/Shoping">
        window.location.href = '/';
    }
    //會員用JS 結尾
    componentDidMount() {
        localStorage.getItem("member_sid")
        let member_sid = localStorage.member_sid
        console.log('member_sid:' + member_sid)
        //有值則將登入狀態繼續為真值
        // if (localStorage.getItem("member_sid")!= null) {
        if (member_sid != null) {
            // alert('key 登入中')
            this.setState({ isAuth: true })
            console.log('isAuth:' + this.setState.isAuth)
        }
        $(".magnifier_icon").click(function () {
            $(".search_bar_css").css({
                width: 180,
                "padding-left": 15,
                "background-color": "var(--main-orange)"
            });
            $(".search_bar_css::placeholder").css("color", "var(--main-white)");
        });
        $(".search_bar_css").blur(function () {
            $(this).css({
                width: 0,
                "padding-left": 0,
                "background-color": "var(--main-white)"
            });
            $(".search_bar_css::placeholder").css("color", "transparent");
        });
        // 兩條線變成X
        let cross_ture = true
        $(function () {
            $('.cross').on('click', function (event) {
                if (cross_ture) {
                    $('.cross').addClass("cross_click")
                    $('.line1').addClass("cross_line1")
                    $('.line2').addClass("cross_line2")
                    cross_ture = false
                } else {
                    $('.cross').removeClass("cross_click")
                    $('.line1').removeClass("cross_line1")
                    $('.line2').removeClass("cross_line2")
                    cross_ture = true
                }
                event.preventDefault();
            });
        });
        let opacityture = true
        $('.nav-item_li').hover(function (event) {
            if (opacityture) {
                $(this).find(".nav_text_a").addClass('opacityfalse_li') //關
                $(this).find(".nav_text_b").removeClass('opacityfalse_li') //去掉關閉
                $(this).find(".nav_text_b").addClass('opacityture_li')  //打開
                opacityture = false
            } else {
                $(this).find(".nav_text_b").removeClass('opacityture_li')  //去掉打開
                $(this).find(".nav_text_b").addClass('opacityfalse_li') //增加關閉
                $(this).find(".nav_text_a").removeClass('opacityfalse_li')  //去掉關閉      
                opacityture = true
            }
            event.preventDefault();
        })
        if ($(window).width() < 800) { //當視窗小於480時才運作
            $('.nav-item_li').on('click', function () {
                $('.cross').click();
            });
        }
    }

    render() {
        return (
            <>
                <div id="nav_top">
                    <div className="nav_top_icon d-flex justify-content-end align-items-center">
                        <form className="">
                            <input
                                className="search_bar_css"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <img src={"../images/Wine_Accessories/icon-search.png"} alt="" className="magnifier_icon" />
                        </form>
                        {localStorage.getItem("member_sid") ? (<Link to="/Member_information"><img src={"../images/Wine_Accessories/icon-member_head.png"} alt="" /></Link>) : ('')}
                        <Link to="/Shoping" className="mr-5">
                            <img id="icon-cart" src={"../images/Wine_Accessories/icon-cart.png"} alt="" />
                        </Link>

                    </div>
                </div>
                <nav class="navbar navbar-expand-lg navbar-light navberLogo">
                    <a class="navbar-brand" href="#">
                        <Link to="/">
                            <img className="Logo_png" src={"../images/Wine_Accessories/logo.png"}></img>
                        </Link>
                        <Link to="/">
                            <img className="Logo_svg ml-3" src={"../images/Wine_Accessories/logo.svg"}></img>
                        </Link>
                    </a>
                    {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button> */}
                    <button className="cross navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </button>
                    <div class="collapse navbar-collapse  justify-content-center" id="navbarSupportedContent">
                        <ul class="navbar-nav d-flex">
                            <li className="nav-item nav-item_li">
                                <Link to="/" className="nav_text_a">首 頁 導 覽</Link>
                                <Link to="/" className="opacityfalse_li nav_text_b">Ｈ ｏ ｍ ｅ</Link>
                            </li>
                            <li className="nav-item nav-item_li">
                                <Link to="/Dining_pub_inquiry" className="nav_text_a">佐一點美食</Link>
                                <Link to="/Dining_pub_inquiry" className="opacityfalse_li nav_text_b">餐酒館預約</Link>
                            </li>
                            <li className="nav-item nav-item_li">
                                <Link to="/Wine_tasting" className="nav_text_a">找一點微醺</Link>
                                <Link to="/Wine_tasting" className="opacityfalse_li nav_text_b">酒類商品區</Link>
                            </li>
                            <li className="nav-item nav-item_li">
                                <Link to="/Wine_accessories" className="nav_text_a">加一點風格</Link>
                                <Link to="/Wine_accessories" className="opacityfalse_li nav_text_b">酒器／酒具</Link>
                            </li>
                            <li className="nav-item nav-item_li">
                                <Link to="/Latest_events" className="nav_text_a">尋一點樂趣</Link>
                                <Link to="/Latest_events_pages/1" className="opacityfalse_li nav_text_b">活動新鮮事</Link>
                            </li>
                            <li className="nav-item nav-item_li">
                                <Link to="/New_knowledge_of_bartending" className="nav_text_a">學一點銘識</Link>
                                <Link to="/New_knowledge_of_bartending" className="opacityfalse_li nav_text_b">品酒小知識</Link>
                            </li>
                            <li className="nav-item nav-item_li">
                                <Link to="/about_us" className="nav_text_a">關於我們</Link>
                                <Link to="/about_us" className="opacityfalse_li nav_text_b">網站架構</Link>
                            </li>
                            {/* 會員顯示登入註冊,反之顯示登出 */}
                            {localStorage.getItem("member_sid") ? (
                                <button className="btn sign_btn_css my-2 my-sm-0 Sign_in_btn" type="submit">

                                    <li className="nav-item nav-item_li">
                                        <NavLink
                                            activeClassName="active"
                                            className="nav-link"
                                            to="/"
                                            onClick={this.signout}> 登出
                                            </NavLink>
                                    </li>
                                </button>
                            ) : (
                                    <button className="btn sign_btn_css my-sm-0 Sign_in_btn " type="submit">
                                        <li className="nav-item Sign_in_nav_li">
                                            <NavLink activeClassName="active"
                                                className="nav-link Sign_in_nav_link"
                                                to="/Login_register">
                                                登入
                                                </NavLink>
                                        </li>
                                    </button>
                                )}
                            {/* 會員顯示登入註冊,反之顯示登出 結束 */}
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}
export default Navigation_Navber_noImg