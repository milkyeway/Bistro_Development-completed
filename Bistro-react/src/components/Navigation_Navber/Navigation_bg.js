import React from 'react'
//樣式
import '../../style/Home.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
// import Shoping from '../../components/ShopingCar/Shoping'
import $ from 'jquery'

//類別型元件
class Navigation_bg extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        return (
            // <Router>
            <>
                <div className="nav_bg_img_nav"></div>
            </>
        )
    }
}
export default Navigation_bg