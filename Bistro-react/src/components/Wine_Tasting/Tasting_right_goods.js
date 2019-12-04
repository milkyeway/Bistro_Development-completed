import React from 'react'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_index.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

//商品細節頁

class Tasting_right_goods extends React.Component {
  constructor(props) {
    super(props)
    // console.log("match" + this.props.sid)
  }
  //JQ放這
  componentDidMount() {
    // console.log(this.props.sid)
  }

  render() {
    // console.log(Math.floor(this.props.price*0.9))
    return (
      <>
        <Col lg={3} md={6} sm={6} className="mt-4 goods">
          <Link to={`Wine_Tasting_detail/${this.props.sid}`}>
            <div className="goods_pic">
              <img src={`http://localhost/bistro/lib/images/wine/uploads/${this.props.my_file}`} />
              {/* <img src="../images/Wine_Accessories/Muirhead's Silver Seal.jpg" alt="" /> */}
            </div>
          </Link>
          <p>{this.props.name}</p>
          <div className="goods_info d-flex justify-content-between align-items-center">
            <div className="price_area">
              <span>$<del>{this.props.price}</del></span> {/*{Math.floor(this.props.price*0.9)}*/}
              <span className="price_discount ml-2">${Math.floor(this.props.price*0.9)}</span>
            </div>
            <div className="goods_icon d-flex">
              <div className="goods_icon_compare">
                <img onClick={this.props.addToCompare(this.props.name,this.props.kind,this.props.my_file,this.props.price,this.props.brand)}  className=".icon-compare" src="../images/Wine_Accessories/icon-compare_wh.png" alt="" />
              </div>
              <div className="goods_icon_compare">
                <img src="../images/Wine_Accessories/icon-like_wh.png" alt="" />
              </div>
              <div className="goods_icon_compare">
                <img src="../images/Wine_Accessories/icon-cart_wh.png" alt="" />
              </div>
            </div>
          </div>
        </Col>
      </>
    )
  }
}
export default Tasting_right_goods