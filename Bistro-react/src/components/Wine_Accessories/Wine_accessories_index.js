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
import Accessories_left_cate from './Accessories_left_cate'
import Accessories_left_sort from './Accessories_left_sort'
// import Accessories_left_priceSlider from './Accessories_left_priceSlider'
import Accessories_right_goods from './Accessories_right_goods'
import Accessories_right_pages from './Accessories_right_pages'
import Accessories_right_compare from './Accessories_right_compare'
import ScrollUpButton from "react-scroll-up-button";

let productCompareNum = 0;
let b = 1

class Wine_accessories_index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [],
      arr: [],
      cate: null,
      sort: null,
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/wine-acce-db')
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

  // 在 cate 和 sort 子元件觸發 handlefilter 事件後，傳handlefilter('XXX')值到這裡（父元件），並用value這個變數去接
  // 接了之後進行判斷，如果不是布林值就setState給 cate，如果是布林值就setState給 sort
  // 接著用 callback function 把 this.state.cate 和 this.state.sort 傳回到 node
  // 感謝 REACT 老師
  handlefilter = (value) => () => {
    this.setState({
      cate: typeof value === 'boolean' ? this.state.cate : value,
      sort: typeof value === 'boolean' ? value : this.state.sort,
    },
      () => {
        console.log(this.state.cate, this.state.sort)
        fetch('http://localhost:3000/wine-acce-123/' + this.state.cate + '/' + this.state.sort)
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

  // 感謝球神讓我知道可以這樣傳值和設變數 Q A Q
  addToCompare = (TITLE, PRICE, PIC, TYPE, BRAND) => () => {
    productCompareNum += 1
    console.log(productCompareNum)

    if (productCompareNum < 4) {
      console.log("點擊")
      $("#product-compare-page").prepend(
        `<div class="compare-item animated fadeIn">
              <div class="product-compare-goods_pic"><img src="http://localhost/bistro/lib/images/acce/test/${PIC}" />
              </div><div class="product-compare-title">${TITLE}</div>
              <div class="product-compare-type">${TYPE}</div>
              <div class="product-compare-brand">${BRAND}</div>
              <div class="product-compare-price">$${PRICE * 0.9}</div> 
              <button class="btn product-compare-add-cart-btn">
              <img src="../images/Wine_Accessories/icon-cart_brown.png" alt="">加入購物車</button></div>`
      )

      $(".product-compare-btn").before(
        `<div class="compare-review">
                <img src="http://localhost/bistro/lib/images/acce/test/${PIC}" />
              </div>`
      )


      

    } else {
      // alert("商品比較表最多只能比較三項商品:)")
      Swal.fire(
        // title: '最多只能比較三項商品',
        // showClass: {
        //   popup: 'animated fadeInDown faster'
        // },
        // hideClass: {
        //   popup: 'animated fadeOutUp faster'
        // },
        // icon: 'error'
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

  // 最佳推薦
  beatBrand = () => () => {
    if (b == 1) {
      console.log("b=1")
      fetch('http://localhost:3000/wine-acce-best-brand')
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
      fetch('http://localhost:3000/wine-acce-db')
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


    // fetch('http://localhost:3000/wine-acce-best-brand')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //     goods : responseJson,
    //   });
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }


  render() {
    if (!this.state.goods.length) return <></>

    //解構賦值
    const { goods } = this.state
    return (
      <>
        <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />
        <Container class="Wine_acce_index_con">
          <Row>
            {/* 左邊 分類篩選*/}

            <Col lg={3} sm={12} id="left_menu" className="mb-5">
              <Accessories_left_cate handlefilter={this.handlefilter} />
              <Accessories_left_sort
                handlefilter={this.handlefilter}
                beatBrand={this.beatBrand}
              />
              {/* <Accessories_left_priceSlider /> */}

            </Col>
            {/* 右邊 顯示商品列表*/}

            <Col lg={9} sm={12} id="main_area" className="main_areacol">
              <Row className="main_arearow">
                <Col lg={12} className="mt-4 product-compare">
                  <Accessories_right_compare
                    showTheCopmarePage={this.showTheCopmarePage}
                    canaelCompare={this.canaelCompare} />
                </Col>
              </Row>
              <Row>

                {goods.map((item) =>
                  <Accessories_right_goods
                    addToCompare={this.addToCompare}
                    key={(item.sid) + 1}
                    sid={item.sid}
                    name={item.name}
                    product_price={item.product_price}
                    product_pic={item.product_pic}
                    product_type={item.product_type}
                    brand={item.brand}
                    cate_1st={item.cate_1st}
                    wendy={item.wendy}
                    ruby={item.ruby}
                  />)}


                {/* 下方顯示總頁數*/}
                <Col lg={12} className="mb-5">
                  {/* <Accessories_right_pages/> */}
                </Col>

              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
export default Wine_accessories_index