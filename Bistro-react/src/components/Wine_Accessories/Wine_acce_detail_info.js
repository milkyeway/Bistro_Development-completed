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


class Wine_acce_detail_info extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }
  componentDidMount () {
  }

    render() {
      const canBuy = {
        color: "var(--main-orange)",
        fontWeight: "bold"
      }

        return (
          <>
            <ul>
              <li className="detail_info">
                <div className="info_title">名稱：</div>
                <div className="info_des">{this.props.name}</div>
              </li>
              <li className="detail_info">
                <div className="info_title">類型：</div>
                <div className="info_des">{this.props.product_type}</div>
              </li>
              <li className="detail_info">
                <div className="info_title">尺寸：</div>
                <div className="info_des">{this.props.product_size}</div>
              </li>
              <li className="detail_info">
                <div className="info_title">容量：</div>
                <div className="info_des">{this.props.product_capacity}</div>
              </li>
              <li className="detail_info">
                <div className="info_title">品牌：</div>
                <div className="info_des">{this.props.brand}</div>
              </li>
              <li className="detail_info">
                <div className="info_title">供貨狀況：</div>
                <div className="info_des" style={canBuy}>可以購買</div>
              </li>
              <li className="detail_info">
                <div className="info_title">優惠售價：</div>
                <div className="info_des">
                  <del>原價 <span>{this.props.product_price}</span></del>
                  <span className="ml-3">會員價 
                    <p className="member_price">${Math.floor(this.props.product_price*0.9)}</p>
                  </span>
                </div>
              </li>
            </ul>
          </>
        )
    }
}
export default Wine_acce_detail_info