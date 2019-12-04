import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_index.scss'
//分頁連結
import Tasting_left_origin from './Tasting_left_origin'
import Tasting_left_cate from './Tasting_left_cate'
import Tasting_left_sort from './Tasting_left_sort'
// import Tasting_left_priceSlider from './Tasting_left_priceSlider'
import Tasting_right_goods from './Tasting_right_goods'
import Tasting_right_pages from './Tasting_right_pages'
import Tasting_right_compare from './Tasting_right_compare'
import ScrollUpButton from "react-scroll-up-button";


let productCompareNum = 0;
let b = 1;

class Wine_Tasting_index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [],
      arr: [],
      cate: null,
      sort: null,
    }
  }
  //JQ放這
  componentDidMount() {

    fetch('http://localhost:3000/wine-wine-db')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          goods: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  handlefilter = (value) => () => {
    console.log("sort來啦")
    this.setState({
      cate: typeof value === 'boolean' ? this.state.cate : value,
      sort: typeof value === 'boolean' ? value : this.state.sort,
    },
      () => {
        console.log(this.state.cate, this.state.sort)
        fetch('http://localhost:3000/wine-tasting-kind/' + this.state.cate + '/' + this.state.sort)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              goods: responseJson,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
  }



  handleTastminus = (value) => () => {
    console.log(value)
    let arr = []
    fetch('http://localhost:3000/Wine_Tastminus/' + value)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          goods: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToCompare = (TITLE, TYPE, PIC, PRICE, BRAND) => () => {
    productCompareNum += 1
    console.log(productCompareNum)
    if (productCompareNum < 4) {
      console.log("點擊")
      $("#product-compare-page").prepend(
        `<div class="compare-item animated fadeIn">
              <div class="product-compare-goods_pic"><img src="http://localhost/bistro/lib/images/wine/uploads/${PIC}" />
              </div><div class="product-compare-title">${TITLE}</div>
              <div class="product-compare-type">${TYPE}</div>
              <div class="product-compare-brand">${BRAND}</div>
              <div class="product-compare-price">$${PRICE * 0.9}</div> 
              <button class="btn product-compare-add-cart-btn">
              <img src="../images/Wine_Accessories/icon-cart_brown.png" alt="">加入購物車</button></div>`
      )

      $(".product-compare-btn").before(
        `<div class="compare-review">
                <img src="http://localhost/bistro/lib/images/wine/uploads/${PIC}" />
              </div>`
      )

    } else {
      Swal.fire(

        '最多只能比較三項商品',
        ' ',
        'warning'
      )
    }
  }

  showTheCopmarePage = () => {
    // console.log("comparebtn",productCompareNum)
    if (productCompareNum < 2) {
      // alert("商品比較表目前不足兩項商品喔:)")
      Swal.fire(
        '目前不足兩項商品喔',
        ' ',
        'warning'
      )
    } else {
      let compareBg = '<style>#root:after</style>';
      $("#root").append('<div class="root-bg"></div>')
      $(".product-compare-page-area").show()
    }
  }

  canaelCompare = () => {
    $(".root-bg").remove()
    $(".product-compare-page-area").hide()
  }

  beatBrand = () => () => {
    if (b == 1) {
      console.log("b=1")
      fetch('http://localhost:3000/wine-tasting-best-brand')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            goods: responseJson,
          });
        })
        .catch((error) => {
          console.error(error);
        });
      b = 2
    } else {
      fetch('http://localhost:3000/wine-wine-db')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            goods: responseJson,
          });
        })
        .catch((error) => {
          console.error(error);
        });
      b = 1
    }
  }





  render() {
    // console.log('parent')
    if (!this.state.goods.length) return <></>

    //解構賦值
    const { goods } = this.state
    return (
      <>
        <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />
        <Container>
          <Row>
            {/* 左邊 分類篩選*/}
            <Col lg={3} sm={12} id="left_menu">
              <Tasting_left_origin handleTastminus={this.handleTastminus} />
              <Tasting_left_cate handlefilter={this.handlefilter} />
              <Tasting_left_sort
                handlefilter={this.handlefilter}
                beatBrand={this.beatBrand}
              />
              {/* <Tasting_left_priceSlider /> */}
            </Col>
            {/* 右邊 顯示商品列表*/}
            <Col lg={9} sm={12} id="main_area" className="main_areacol">
              <Row className="main_arearow">
                <Col lg={12} className="mt-4 product-compare">
                  <Tasting_right_compare
                    showTheCopmarePage={this.showTheCopmarePage}
                    canaelCompare={this.canaelCompare} />
                </Col>
              </Row>
              <Row>

                {goods.map((item) =>
                  <Tasting_right_goods
                    addToCompare={this.addToCompare}
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
                  />)}
                {/* 下方顯示總頁數*/}
                <Col lg={12}>
                  {/* <Tasting_right_pages /> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
export default Wine_Tasting_index