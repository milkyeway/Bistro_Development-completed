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


class Tasting_detail_dec_title extends React.Component {
  constructor() {
    super()
  }
  //JQ放這
  componentDidMount() {
    $(".goods_description_title").click(function () {
      $(this).addClass("bg_grey")
      $(".goods_brand_story_title").removeClass("bg_grey")
      $(".goods_description").show()
      $(".goods_brand_story").hide()
    })
    $(".goods_brand_story_title").click(function () {
      $(this).addClass("bg_grey")
      $(".goods_description_title").removeClass("bg_grey")
      $(".goods_brand_story").show()
      $(".goods_description").hide()
    })
  }

  render() {
    return (
      <>
        <div className="row mt-4">
          <div className="col-6 goods_description_title bg_grey">商品簡述</div>
          <div className="col-6 goods_brand_story_title">品牌故事</div>
        </div>
      </>
    )
  }
}
export default Tasting_detail_dec_title