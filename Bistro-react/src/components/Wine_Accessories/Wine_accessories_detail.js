import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Wine_accessories/Wine_service_detail.scss'

//分頁連結
import Wine_acce_detail_breadcrumb from './Wine_acce_detail_breadcrumb'
import Wine_acce_detail_picslider from './Wine_acce_detail_picslider'
import Wine_acce_detail_picslider_preview from './Wine_acce_detail_picslider_preview'
import Wine_acce_detail_info from './Wine_acce_detail_info'
import Wine_acce_detail_info_btn from './Wine_acce_detail_info_btn'
import Wine_acce_detail_dec_title from './Wine_acce_detail_dec_title'
import Wine_acce_detail_recommenditem from './Wine_acce_detail_recommenditem'

import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
import Footer from '../Navigation_Navber/Footer'
import ScrollUpButton from "react-scroll-up-button";

class Wine_accessories_detail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      details: [],
    }
  }
  //JQ放這
  componentDidMount() {
    // 幫您推薦的商品價錢的 $
    $(".recommend_price").prepend("$ ")

    fetch("http://localhost:3000/Wine_accessories_detail/" + this.props.match.params.sid)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        let like = JSON.stringify(responseJson.mylike.map(value => {
          return value.product_id
        }))
        console.log(like)
        localStorage.setItem('yishiLike', like)
        this.setState({
          details: responseJson.acce,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }




  render() {


    if (!this.state.details.length) return <></>

    //解構賦值
    const { details } = this.state
    console.log('details', details)
    return (
      <>
        <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />
        <Navigation_Navber_noImg />
        <Navigation_bg />

        {details.map((info, i) => (
          <Container className="Wine_acce_detail_con">
            <Wine_acce_detail_breadcrumb
              key={i + 3}
              category_1st={info.category_1st}
              category_2nd={info.category_2nd}
              category_3rd={info.category_3rd}
              wendy={info.wendy}
              ruby={info.ruby}
              cate_3rd={info.cate_3rd}
            />

            <Row>
              <Col lg={6} md={12} sm={12} className="my-4">
                <Wine_acce_detail_picslider
                  key={i + 1}
                  product_pic={info.product_pic}
                />
                <Wine_acce_detail_picslider_preview
                  key={i + 2}
                  product_pic={info.product_pic}
                />
              </Col>

              <Col lg={6} md={12} sm={12} className="my-4">
                <Wine_acce_detail_info
                  key={i}
                  name={info.name}
                  product_type={info.product_type}
                  brand={info.brand}
                  product_price={info.product_price}
                  product_size={info.product_size}
                  product_capacity={info.product_capacity}
                />
                <Wine_acce_detail_info_btn
                  key={i}
                  product_sid={info.sid}
                  name={info.name}
                  product_pic={info.product_pic}
                  product_price={info.product_price}
                  product_qty={1}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Wine_acce_detail_dec_title />
              </Col>
            </Row>

            <Row>
              <Col lg={12} md={12} className="goods_description">{info.product_introduce}</Col>
              <Col lg={12} md={12} className="goods_brand_story">{info.brand_story}</Col>
            </Row>

            <Row>
              <Col lg={12} className="goods_recommend_title">幫您推薦</Col>
            </Row>

            <Row className="mt-4">
              <Col className="recommend_area d-flex">
                <Wine_acce_detail_recommenditem />
              </Col>
            </Row>

          </Container>
        ))}

        <Footer />
      </>
    )
  }
}
export default Wine_accessories_detail