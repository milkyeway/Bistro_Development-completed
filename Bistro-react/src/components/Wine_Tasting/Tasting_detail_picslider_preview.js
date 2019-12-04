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


class Tasting_detail_picslider_preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
    // console.log(this.props.match.params)
  }
    //JQ放這
    componentDidMount() {
      let sliderWidth = $("#slider_wrap").width();
      let sliderNum = 0;
      let sliderCont = $(".slider-cont li").length
      let previewImgIndex = 0;

      $(".preview_img").eq(0).css("border-color","var(--text-color)")

      $(".slider-cont").css("width",sliderWidth*sliderCont)
      $(window).resize(function(event){
        sliderWidth = $("#slider_wrap").width();
        $(".slider-cont").css("width",sliderWidth*sliderCont)
        $(".slider-cont").css("left",0-sliderWidth*previewImgIndex)
      })
      $(".preview_img").click(function(event){
        $(this).css("border-color","var(--text-color)")
        $(this).siblings().css("border-color","transparent")
        previewImgIndex = $(this).index()
        $(".slider-cont").css("left",0-sliderWidth*previewImgIndex)
      })
    }

    render() {
        return (
          <>
            <div class="preview_area d-flex">
              <div class="preview_img preview_img1"><img src={`http://localhost/bistro/lib/images/wine/uploads/${this.props.my_file}`} /></div>
              <div class="preview_img"><img src="../images/HomeCarousel/glasses-3823754_1920.jpg" alt=""/></div>
              <div class="preview_img"><img src="../images/HomeCarousel/bowmore-886536_1920.jpg" alt=""/></div>
              <div class="preview_img"><img src="../images/HomeCarousel/wine-791132_1920.jpg" alt=""/></div>
            </div>
          </>
        )
    }
}
export default Tasting_detail_picslider_preview