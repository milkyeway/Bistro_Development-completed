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


class Tasting_info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  //JQ放這
  componentDidMount() {

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
            <div className="info_title">種類：</div>
            <div className="info_des">{this.props.kind}</div>
          </li>
          <li className="detail_info">
            <div className="info_title">產區：</div>
            <div className="info_des">{this.props.Production_area}</div>
          </li>
          <li className="detail_info">
            <div className="info_title">生產國：</div>
            <div className="info_des">{this.props.producing_countries}</div>
          </li>
          <li className="detail_info">
            <div className="info_title">容量：</div>
            <div className="info_des">{this.props.capacity}</div>
          </li>
          <li className="detail_info">
            <div className="info_title">品牌：</div>
            <div className="info_des">{this.props.brand}</div>
          </li>
          <li className="detail_info">
            <div className="info_title">出貨單位：</div>
            <div className="info_des">瓶</div>
          </li>
          <li className="detail_info">
            <div className="info_title">供貨狀況：</div>
            <div className="info_des" style={canBuy}>可以購買</div>
          </li>
          <li className="detail_info">
            <div className="info_title">優惠售價：</div>
            <div className="info_des">
              <del>原價 <span>{this.props.price}</span></del>
              <span className="ml-3">會員價
                    <p className="member_price">${Math.floor(this.props.price*0.9)}</p>
              </span>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default Tasting_info