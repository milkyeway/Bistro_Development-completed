import React from 'react'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_index.scss'


//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'

//商品細節頁

class Tasting_right_compare extends React.Component {
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
            <button className="btn product-compare-btn" onClick={this.props.showTheCopmarePage}>COMPARE</button>
            <div className="product-compare-page-area">
              <div id="product-compare-page">
              <div className="icon-cancel-area" onClick={this.props.canaelCompare}>
                <img className="icon-cancel" src="../images/Wine_Accessories/icon-cancel.png" />
              </div>
              </div>
            </div>
      </>
    )
  }
}
export default Tasting_right_compare