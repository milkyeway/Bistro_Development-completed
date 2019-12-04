import React from 'react'
//樣式
import '../../style/Home.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import Home from '../../pages/Home'
import Dining_pub_inquiry from '../../pages/Dining_pub_inquiry'
import Wine_tasting from '../../pages/Wine_tasting'
import Wine_Tasting_detail from '../Wine_Tasting/Wine_Tasting_detail'
import Wine_accessories from '../../pages/Wine_accessories'
import Wine_accessories_detail from '../Wine_Accessories/Wine_accessories_detail'
import Latest_events from '../../pages/Latest_events'
import New_knowledge_of_bartending from '../../pages/New_knowledge_of_bartending'
import Blog_article from '../Blog/Blog_article'
import about_us from '../../pages/about_us'
import Login_register from '../../pages/Login_register'
import Shoping from '../ShopingCar/Shoping'
import Billing_details from '../ShopingCar/Billing_details'
import ScrollToTop from '../ScrollToTop'
import Latest_events_detail from '../Latest_events/Latest_events_detail'

import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'

//會員連結
import Member_Information from '../Login_V/Member_Information'
import Member_Register from '../Login_S/Member_Register'
import ProtectedRoute from '../utility/ProtectedRoute'
//會員連結

import $ from 'jquery'

class Navigation_Navber_Home extends React.Component {
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
        // if (localStorage.getItem("member_sid")!= null) {
            if (member_sid!= null) {
        // alert('key 登入中')
            this.setState({ isAuth: true }) 
            console.log('isAuth:'+ this.setState.isAuth)
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
            <Router>
                <>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path="/" component={Home} /> {/* 首頁 */}
                            <Route exact path="/Dining_pub_inquiry" component={Dining_pub_inquiry} />{/* 餐酒館查詢 */}
                            <Route exact path="/Wine_tasting" component={Wine_tasting} />{/* 品酒迷因 */}
                            <Route exact path="/Wine_Tasting_detail/:sid" component={Wine_Tasting_detail} />{/* 品酒迷因 */}
                            <Route exact path="/Wine_accessories" component={Wine_accessories} />{/* 酒具服務 */}
                            <Route exact path="/Wine_accessories_detail/:sid" component={Wine_accessories_detail} />{/* 酒具細節 */}
                            {/* <Route exact path="/Latest_events" component={Latest_events} />最新活動 */}
                            <Route exact path="/Latest_events_pages/:page" component={Latest_events} />{/* �̷s���� */}
                            <Route exact path="/Latest_events_detail/:sid" component={Latest_events_detail} />{/* 最新活動細節 */}
                            <Route exact path="/New_knowledge_of_bartending" component={New_knowledge_of_bartending} />{/* 調酒新知 */}
                            <Route exact path="/Blog_article/:sid" component={Blog_article} />{/* Blog文章內容 */}
                            <Route exact path="/about_us" component={about_us} />{/* 關於我們 */} 
                            <Route exact path="/Shoping" component={Shoping} /> {/*購物車*/}
                            <Route exact path="/ShopingCar/Billing_details" component={Billing_details} /> {/* 購物車細節 */}
                            {/* 會員登入 傳值給Login_register用 */}
                        <Route
                            path="/Login_register"
                            render={props => (
                                <Login_register
                                    authenticate={this.authenticate}
                                    isAuth={this.state.isAuth}
                                    {...props}
                                />
                            )}
                        />
                        <Route exact path="/Member_Register" component={Member_Register} />
                        <ProtectedRoute
                            path="/Member_Information"
                            component={Member_Information}
                            isAuth={this.state.isAuth}
                        />
                        {/* 會員登入 傳值給Login_register結束 */}
                        </Switch>
                    </ScrollToTop>
                </>
            </Router>
        )
    }
}
export default Navigation_Navber_Home