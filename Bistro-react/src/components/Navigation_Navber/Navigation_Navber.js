import React from 'react'
//樣式
import '../../style/Home.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
// import Shoping from '../../components/ShopingCar/Shoping'
import $ from 'jquery'

//類別型元件
class Navigation_Navber extends React.Component {
    constructor(props) {
        super(props)
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
            alert('您已登出')
        }
        //會員用JS 結尾
    componentDidMount() {
          // 會員判定登入與否開始 
          localStorage.getItem("member_sid")
          let member_sid=localStorage.member_sid
          // console.log('member_sid:'+member_sid)
          //有值則將登入狀態繼續為真值
          if (localStorage.getItem("member_sid")!= null) {
              // alert('key 登入中')
              this.setState({ isAuth: true }) 
          }
            // 會員判定登入與否結束
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
    }
    render() {
        return (
            // <Router>
            <>
                <div className="nav_bg_img">
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
                            { localStorage.getItem("member_sid") ? (<Link to="/Member_information"><img src={"./images/Wine_Accessories/icon-member_head.png"} alt="" /></Link> ) : ( '' )}
                            <Link to="/Shoping">
                                <img id="icon-cart" src={"../images/Wine_Accessories/icon-cart.png"} alt="" />
                            </Link>
                            <p className="chart_money mr-5">0／<strong> $0.00</strong></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Navigation_Navber