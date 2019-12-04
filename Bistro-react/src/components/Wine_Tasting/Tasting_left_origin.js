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

class Tasting_left_origin extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // 篩選類別第二層動畫
    $(".origin_1st").click(function () {
      $(this).parent().find(".origin_2se").slideToggle()
    })
    // RWD 左邊欄位下拉選單
    $(".plus-minus-origin").click(function () {
      $(".left_menu_origin>ul").slideToggle()
      $(".plus-origin").toggle()
      $(".minus-origin").toggle()
    })
  }

  render() {
    return (
      <>
        <div id="Fte" className="mt-4 left_menu_origin">
          <div className="menu_origin_tit">
            <p>ORIGIN</p>
            <div className="plus-minus-origin">
              <img src="../images/Wine_Accessories/plus.png" className="plus-origin" alt="" />
              <img src="../images/Wine_Accessories/minus.png" className="minus-origin" alt="" />
            </div>
          </div>
          <ul>
            <li class="">
              <div class="origin_1st d-flex justify-content-between">
                <div>歐洲</div>
                <div>(13)</div>
              </div>
              <div class="origin_2se">
                <ul>
                  <li onClick={this.props.handleTastminus('9')}>西班牙</li>
                  <li onClick={this.props.handleTastminus('15')}>蘇格蘭</li>
                  <li onClick={this.props.handleTastminus('11')}>葡萄牙</li>
                  <li onClick={this.props.handleTastminus('16')}>英國</li>
                  <li onClick={this.props.handleTastminus('4')}>義大利</li>
                  <li onClick={this.props.handleTastminus('19')}>瑞典</li>
                  <li onClick={this.props.handleTastminus('18')}>波蘭</li>
                  <li onClick={this.props.handleTastminus('12')}>法國</li>
                  <li onClick={this.props.handleTastminus('20')}>捷克</li>
                  <li onClick={this.props.handleTastminus('14')}>拉脫維亞</li>
                  <li onClick={this.props.handleTastminus('22')}>愛爾蘭</li>
                  <li onClick={this.props.handleTastminus('12')}>德國</li>
                  <li onClick={this.props.handleTastminus('13')}>匈牙利</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="origin_1st d-flex justify-content-between">
                <div>美洲</div>
                <div>(8)</div>
              </div>
              <div class="origin_2se">
                <ul>
                  <li onClick={this.props.handleTastminus('29')}>阿根廷</li>
                  <li onClick={this.props.handleTastminus('19')}>聖露西亞</li>
                  <li onClick={this.props.handleTastminus('5')}>美國</li>
                  <li onClick={this.props.handleTastminus('26')}>波多黎各</li>
                  <li onClick={this.props.handleTastminus('6')}>智利</li>
                  <li onClick={this.props.handleTastminus('25')}>多明尼加</li>
                  <li onClick={this.props.handleTastminus('21')}>墨西哥</li>
                  <li onClick={this.props.handleTastminus('1')}>加拿大</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="origin_1st d-flex justify-content-between">
                <div>亞洲</div>
                <div>(3)</div>
              </div>
              <div class="origin_2se">
                <ul>
                  <li onClick={this.props.handleTastminus('27')}>韓國</li>
                  <li onClick={this.props.handleTastminus('28')}>臺灣</li>
                  <li onClick={this.props.handleTastminus('17')}>日本</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="origin_1st d-flex justify-content-between">
                <div>大洋洲</div>
                <div>(2)</div>
              </div>
              <div class="origin_2se">
                <ul>
                  <li onClick={this.props.handleTastminus('3')}>紐西蘭</li>
                  <li onClick={this.props.handleTastminus('8')}>澳洲</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="origin_1st d-flex justify-content-between">
                <div>非洲</div>
                <div>(2)</div>
              </div>
              <div class="origin_2se">
                <ul>
                  <li onClick={this.props.handleTastminus('7')}>南非</li>
                  <li onClick={this.props.handleTastminus('24')}>千里達及托巴哥共和國</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </>
    )
  }
}
export default Tasting_left_origin