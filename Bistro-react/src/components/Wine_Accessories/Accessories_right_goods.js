import React from 'react'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'

//商品細節頁

class Accessories_right_goods extends React.Component {
  constructor(props) {
    super(props)
    // console.log("match"+this.props.sid)
  }
  //JQ放這
  componentDidMount() {


  }

  render() {
    
    return (
      <>
          <Col lg={3} md={6} sm={6} className="mt-4 goods">
            <Link to={`Wine_accessories_detail/${this.props.sid}`}>
              <div className="goods_pic">
                <img src={`http://localhost/bistro/lib/images/acce/test/${this.props.product_pic}`} alt="" />
              </div>
            </Link>
            <p>{this.props.name}</p>
            <div className="goods_info d-flex justify-content-between align-items-center">
              <div className="price_area">
                <span>$<del>{this.props.product_price}</del></span> 
                <span className="price_discount ml-2">${Math.floor(this.props.product_price*0.9)}</span>
              </div>
              <div className="goods_icon d-flex">
                <div className="goods_icon_compare little-1">
                  {/* 點擊加入比較的icon後，會觸發父元件 addToCompare這個function，並將()中 this.props.XXX 這些值【依序】往上傳 */}
                  <img onClick={this.props.addToCompare(this.props.name,this.props.product_price,this.props.product_pic,this.props.product_type,this.props.brand)}  src="../images/Wine_Accessories/icon-compare_wh.png" alt="" />
                  {/* <img onClick={this.props.addToCompare(this.props.name,this.props.product_price,this.props.product_pic,this.props.product_type,this.props.brand)}  className="icon-compare" src="../images/Wine_Accessories/icon-compare_wh.png" alt="" /> */}
                </div>
                <div className="goods_icon_compare little-2">
                  <img className="little-icon-Click" src="../images/Wine_Accessories/icon-like_wh.png" alt="" />
                </div>
                <div className="goods_icon_compare little-3">
                  <img src="../images/Wine_Accessories/icon-cart_wh.png" alt="" />
                </div>
              </div>
            </div>
          </Col>
      </>
    )
  }
}
export default Accessories_right_goods