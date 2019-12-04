import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'
import ScrollUpButton from "react-scroll-up-button";

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_detail.scss'
//分頁連結
import Tasting_breadcrumb from './Tasting_breadcrumb'
import Tasting_detail_picslider from './Tasting_detail_picslider'
import Tasting_detail_picslider_preview from './Tasting_detail_picslider_preview'
import Tasting_detail_info from './Tasting_detail_info'
import Tasting_detail_info_btn from './Tasting_detail_info_btn'
import Tasting_detail_dec_title from './Tasting_detail_dec_title'
import Tasting_detail_recommenditem from './Tasting_detail_recommenditem'

import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
import Footer from '../Navigation_Navber/Footer'



class Wine_Tasting_detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: [],
      qty: 1,
      sid: '',
      price: '',
      name: '',
    }
    // console.log(this.props.match.params)
  }
  //JQ放這
  componentDidMount() {
    console.log(this.props.match.params.sid)
    fetch(`http://localhost:3000/Wine_Tasting_detail/${this.props.match.params.sid}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          details: responseJson,
          sid: responseJson[0].sid,     //酒sid
          name: responseJson[0].name,   //酒名
          price: responseJson[0].price, //價錢
        });
        // console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });

    // 商品簡述內文 & 品牌故事內文 切換動畫
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

    // 幫您推薦的商品價錢的 $
    $(".recommend_price").prepend("$ ")
  }

  // 新增一筆資料到伺服器
  addNewItemToServer = () => {
    console.log('hi:', this.state)
    console.log('aaaaa')
    const member_sid = localStorage.getItem('member_sid')
    const sid = this.state.sid     //酒sid
    const name = this.state.name   //酒名
    const price = this.state.price //價錢
    const qty = this.state.qty
    console.log('member_sid:', member_sid)

    let data = {
      member_sid,
      sid,
      name,
      price,
      qty,
    }
    console.log('hi data:', data)
    const url = 'http://localhost:3000/temporary_shopping_cart_wine_goods'
    this.requestToServer(url, 'POST', data)
  }

  requestToServer = async (url, method, data) => {
    // GET方法不有body，先設定出樣版物件
    const requestTemplate = new Request(url, {
      method: method,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    let req = requestTemplate

    // 如果不是GET再加上body
    if (method !== 'GET')
      req = new Request(requestTemplate, { body: JSON.stringify(data) })

    try {
      const response = await fetch(req)
      const jsonObject = await response.json()
      console.log(jsonObject)
      if (method === 'GET')
        this.setState({
          detail_data: jsonObject,
          // })
          // this.setState({ 
          sid: jsonObject[0].sid,
          price: jsonObject[0].price,
          name: jsonObject[0].name,
          qty: this.state.qty,
        })
      console.log(jsonObject[0])
    } catch (error) {
      // Error
      this.setState({ result: error })
      console.log('錯誤訊息', error)
    }
  }



  render() {

    if (!this.state.details.length) return <></>

    //解構賦值
    const { details } = this.state
    return (
      <>
        <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />
        <Navigation_Navber_noImg />
        <Navigation_bg />
        {details.map((item, i) => (
          <Container className="tasting_detail_picslider_col">
            {/* 麵包屑 */}
            <Tasting_breadcrumb
              key={item.sid + 1}
              sid={item.sid}
              kind={item.kind} //種類
              category_1st={item.category_1st}
            />
            {/* --商品照片與資訊 */}
            <Row>
              {/* --商品照片 */}
              <Col lg={6} md={12} sm={12} className="my-4">
                <Tasting_detail_picslider my_file={item.my_file} //圖片
                />
                <Tasting_detail_picslider_preview
                  my_file={item.my_file} //圖片
                />
              </Col>
              {/* --商品資訊 */}
              <Col lg={6} md={12} sm={12} className="my-4">
                <Tasting_detail_info
                  key={item.sid}
                  sid={item.sid}
                  name={item.name} //名稱
                  kind={item.kind} //種類
                  producing_countries={item.producing_countries} //生產國
                  brand={item.brand}  //品牌
                  Production_area={item.Production_area} //產區
                  capacity={item.capacity} //容量
                  price={item.price} //$$
                  my_file={item.my_file} //圖片
                />
                <Tasting_detail_info_btn addNewItemToServer={this.addNewItemToServer}
                  key={item.sid}
                  sid={item.sid}
                  name={item.name} //名稱
                  price={item.price} //$$
                  qty='1'
                />
              </Col>
            </Row>
            {/* 商品簡述標題+品牌故事標題 */}
            <Row>
              <Col lg={12}>
                <Tasting_detail_dec_title />
              </Col>
            </Row>
            {/* 商品簡述+品牌故事內文 */}
            <Row>
              <Col lg={12} md={12} className="goods_description">{item.Product_brief}</Col>
              <Col lg={12} md={12} className="goods_brand_story">{item.Brand_story}</Col>
            </Row>
            {/* 幫您推薦標題 */}
            <Row>
              <Col lg={12} className="goods_recommend_title">幫您推薦</Col>
            </Row>
            {/* 幫您推薦商品 */}
            <Row className="mt-4">
              <Col className="recommend_area d-flex">
                <Tasting_detail_recommenditem />
              </Col>
            </Row>

          </Container>
        ))}
        <Footer />
      </>
    )
  }
}
export default Wine_Tasting_detail