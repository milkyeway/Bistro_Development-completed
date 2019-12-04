import React from 'react'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../../style/Wine_accessories/Wine_service_index.scss'


//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

import $ from 'jquery'

class Accessories_left_cate extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
    }
    componentDidMount() {
      // 篩選類別第二層動畫
      $(".cate_1st").click(function(){
        $(this).parent().find(".cate_2se").slideToggle()
      })
      // RWD 左邊欄位下拉選單
      $(".plus-minus-cate").click(function(){
        $("#left_menu_cate>ul").slideToggle()
        $(".plus-cate").toggle()
        $(".minus-cate").toggle()
      })
      $(".plus-minus-sort").click(function(){
        $(".sort_option").slideToggle()
        $(".plus-sort").toggle()
        $(".minus-sort").toggle()
      })
    }
    
    
    render() {
      
        return (
          <>
            <div id="left_menu_cate" className="mt-4">
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
                  <div>酒杯</div>
                  <div>(4)</div>
                </div>
                <div class="cate_2se">
                  <ul>
                    <li value="b" onClick={this.props.handlefilter('b1')}>葡萄酒杯</li>
                    <li onClick={this.props.handlefilter('b2')}>威士忌杯</li>
                    <li onClick={this.props.handlefilter('b3')}>白蘭地杯</li>
                    <li onClick={this.props.handlefilter('b4')}>雞尾酒杯</li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="cate_1st d-flex justify-content-between">
                  <div>醒酒器</div>
                  <div>(2)</div>
                </div>
                <div class="cate_2se">
                  <ul>
                    <li onClick={this.props.handlefilter('b6')}>有過濾功能</li>
                    <li onClick={this.props.handlefilter('b7')}>無過濾功能</li>
                  </ul>
                </div>
              </li>
              <li class="">
                <div class="cate_1st d-flex justify-content-between">
                  <div>注酒器</div>
                  <div>(2)</div>
                </div>
                <div class="cate_2se">
                  <ul>
                    <li onClick={this.props.handlefilter('b8')}>有瓶塞</li>
                    <li onClick={this.props.handlefilter('b9')}>無瓶塞</li>
                  </ul>
                </div>
              </li>
              <li class="">
                <div class="cate_1st d-flex justify-content-between">
                  <div>冰桶</div>
                  <div>(3)</div>
                </div>
                <div class="cate_2se">
                  <ul>
                    <li onClick={this.props.handlefilter('b10')}>不鏽鋼</li>
                    <li onClick={this.props.handlefilter('b12')}>塑料</li>
                    <li onClick={this.props.handlefilter('b11')}>其他材質</li>
                  </ul>
                </div>
              </li>
              <li class="">
                <div class="cate_1st d-flex justify-content-between">
                  <div>其他</div>
                  <div>(6)</div>
                </div>
                <div class="cate_2se">
                  <ul>
                    <li onClick={this.props.handlefilter('b13')}>開瓶器</li>
                    <li onClick={this.props.handlefilter('b14')}>止滴片</li>
                    <li onClick={this.props.handlefilter('b15')}>止滴環</li>
                    <li onClick={this.props.handlefilter('b16')}>溫度計</li>
                    <li onClick={this.props.handlefilter('b17')}>溫度環</li>
                    <li onClick={this.props.handlefilter('b18')}>不鏽鋼冰塊</li>
                  </ul>
                </div>
              </li>
              </ul>
          </div>
          </>
        )
    }
}
export default Accessories_left_cate