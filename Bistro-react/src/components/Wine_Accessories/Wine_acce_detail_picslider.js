import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
// import '../../style/Wine_accessories/Wine_service_detail.scss'
//分頁連結


class Wine_acce_detail_picslider extends React.Component {
    constructor() {
        super()
    }
    //JQ放這
    componentDidMount() {

    }

    render() {
        return (
          <>
            <div id="slider_wrap">
              <div className="slider-cont-wrap">
                <ul className="d-flex slider-cont">
                  <li><img src={`http://localhost/bistro/lib/images/acce/test/${this.props.product_pic}`} alt=""/></li>
                  <li><img src="../images/Wine_Accessories/slider01.jpg" alt=""/></li>
                  <li><img src="../images/Wine_Accessories/slider03.jpg" alt=""/></li>
                  <li><img src="../images/Wine_Accessories/slider04.jpg" alt=""/></li>
                </ul>
              </div>
            </div>
          </>
        )
    }
}
export default Wine_acce_detail_picslider