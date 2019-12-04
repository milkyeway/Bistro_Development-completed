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

class Tasting_left_cate extends React.Component {
  constructor(props) {
    super(props)
  }
  //JQ放這
  componentDidMount() {
    // 篩選類別第二層動畫
    $(".cate_1st").click(function () {
      $(this).parent().find(".cate_2se").slideToggle()
    })
   
    // RWD 左邊欄位下拉選單
    $(".plus-minus-cate").click(function () {
      $(".left_menu_cate>ul").slideToggle()
      $(".plus-cate").toggle()
      $(".minus-cate").toggle()
    })
  }

  render() {
    return (
      <>
        <div id="left_menu_cate" className="mt-2 left_menu_cate">
          <div className="menu_cate_tit">
            <p>CATEGORIES</p>
            <div className="plus-minus-cate">
              <img src="../images/Wine_Accessories/plus.png" className="plus-cate" alt="" />
              <img src="../images/Wine_Accessories/minus.png" className="minus-cate" alt="" />
            </div>
          </div>
          <ul>
            <li class="">
              <div class="cate_1st d-flex justify-content-between">
                <div>葡萄酒</div>
                <div>(6)</div>
              </div>
              <div class="cate_2se">
                <ul>
                  <li onClick={this.props.handlefilter('1')}>冰酒</li>
                  <li onClick={this.props.handlefilter('2')}>紅酒</li>
                  <li onClick={this.props.handlefilter('3')}>白酒</li>
                  <li onClick={this.props.handlefilter('4')}>粉紅酒</li>
                  <li onClick={this.props.handlefilter('5')}>甜白酒</li>
                  <li onClick={this.props.handlefilter('6')}>加烈酒</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="cate_1st d-flex justify-content-between">
                <div>氣泡酒</div>
                <div>(3)</div>
              </div>
              <div class="cate_2se">
                <ul>
                  <li onClick={this.props.handlefilter('7')}>氣泡酒</li>
                  <li onClick={this.props.handlefilter('8')}>法國香檳</li>
                  <li onClick={this.props.handlefilter('26')}>香檳氣泡酒</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="cate_1st d-flex justify-content-between">
                <div>威士忌</div>
                <div>(3)</div>
              </div>
              <div class="cate_2se">
                <ul>
                  <li onClick={this.props.handlefilter('9')}>調和威士忌</li>
                  <li onClick={this.props.handlefilter('10')}>單一純麥威士忌</li>
                  <li onClick={this.props.handlefilter('11')}>穀類威士忌</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="cate_1st d-flex justify-content-between">
                <div>調酒</div>
                <div>(8)</div>
              </div>
              <div class="cate_2se">
                <ul>
                  <li onClick={this.props.handlefilter('12')}>伏特加</li>
                  <li onClick={this.props.handlefilter('13')}>艾碧斯</li>
                  <li onClick={this.props.handlefilter('14')}>利口酒</li>
                  <li onClick={this.props.handlefilter('15')}>苦艾酒</li>
                  <li onClick={this.props.handlefilter('16')}>香甜酒</li>
                  <li onClick={this.props.handlefilter('17')}>琴酒</li>
                  <li onClick={this.props.handlefilter('18')}>龍舌蘭</li>
                  <li onClick={this.props.handlefilter('19')}>蘭姆酒</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="cate_1st d-flex justify-content-between">
                <div>清酒燒酎</div>
                <div>(5)</div>
              </div>
              <div class="cate_2se">
                <ul>
                  <li onClick={this.props.handlefilter('20')}>麥燒酌</li>
                  <li onClick={this.props.handlefilter('21')}>大吟釀</li>
                  <li onClick={this.props.handlefilter('22')}>吟釀</li>
                  <li onClick={this.props.handlefilter('23')}>純米酒</li>
                  <li onClick={this.props.handlefilter('24')}>燒酌</li>
                </ul>
              </div>
            </li>
            <li class="">
              <div class="cate_1st d-flex justify-content-between">
                <div>金門高梁</div>
                <div>(1)</div>
              </div>
              <div class="cate_2se">
                <ul>
                  <li onClick={this.props.handlefilter('25')}>金門高粱</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </>
    )
  }
}
export default Tasting_left_cate