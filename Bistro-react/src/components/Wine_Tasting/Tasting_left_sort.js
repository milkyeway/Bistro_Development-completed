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


class Tasting_left_sort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [],
      arr: [],
      sort: null,
    }
  }
  //JQ放這
  componentDidMount() {
    $(".plus-minus-sort").click(function () {
      $(".sort_option").slideToggle()
      $(".plus-sort").toggle()
      $(".minus-sort").toggle()
    })

    $("#price_low").click(function() {
      if(this.checked) {
        $("#price_high").attr("disabled","disabled")
        $("label[for='price_high']").css("color","var(--frame-color)")
      }else{
        $("#price_high").removeAttr("disabled")
        $("label[for='price_high']").css("color","var(--text-color)")
      }
    });
    $("#price_high").click(function() {
      if(this.checked) {
        $("#price_low").attr("disabled","disabled")
        $("label[for='price_low']").css("color","var(--frame-color)")
      }else{
        $("#price_low").removeAttr("disabled")
        $("label[for='price_low']").css("color","var(--text-color)")
      }
    });

  }

  render() {
    return (
      <>
        <div id="left_menu_sort">
          <div className="menu_menu_tit">
            <p>SORT</p>
            <div className="plus-minus-sort">
              <img src="../images/Wine_Accessories/plus.png" className="plus-sort" alt="" />
              <img src="../images/Wine_Accessories/minus.png" className="minus-sort" alt="" />
            </div>
          </div>
          <div className="sort_option">
            <input
             type="checkbox"
              name="best"
              id="best"
              value="best"
              onClick={this.props.beatBrand()} />
            <label for="best">推薦品牌</label>
          </div>
          <div className="sort_option">
            <input type="checkbox" name="hot" id="hot" value="hot" />
            <label for="hot">人氣熱門</label>
          </div>
          <div className="sort_option">
            <input
              type="checkbox"
              name="price_low"
              id="price_low"
              value="price_low"
              onClick={this.props.handlefilter(false)}
            />
            <label for="price_low">價格（低至高）</label>
          </div>
          <div className="sort_option">
            <input
              type="checkbox"
              name="price_high"
              id="price_high"
              value="price_high"
              onClick={this.props.handlefilter(true)}
            />
            <label for="price_high">價格（高至低）</label>
          </div>
          <div className="sort_option">
            <input type="checkbox" name="combo" id="combo" value="combo" />
            <label for="combo">精選組合</label>
          </div>
        </div>
      </>
    )
  }
}
export default Tasting_left_sort