import React from 'react'
import $ from 'jquery'
import AOS from 'aos';


//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css'
import '../../style/Blog/css/aos.css';


//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

class Blog_list_right_cate extends React.Component {
    constructor(props) {
        super(props)
    }
    //JQ放這
    componentDidMount() {
      AOS.init({
        duration : 1000
      })
    }

    render() {
      console.log(this.props.handlefilter)
        return (
          <>
            <div>

              <div className="sidebar-wrap" data-aos='fade-left' data-aos-once='true'>
                <div className="sidebar-box p-4 about text-center ftco-animate">
                  <div className="text pt-2">
                    Bistro為結合「食」、「育」、「樂」的線上酒品媒合平台，不論新手或老
                    饕，都能在此找到最適合自己需求的酒種和餐廳。
                  </div>
                </div>
              </div>

              <div className="sidebar-box categories ftco-animate" data-aos='fade-left' data-aos-once='true'>
                <div className="sidebar-box ftco-animate">
                  <ul className="categories">
                    <h3 className="heading mb-4">CATEGORIES</h3>
                    
                    <li><a href="#" onClick={this.props.handlefilter('2019-11')}>2019 11月<span>(5)</span></a></li>
                    <li><a href="#" onClick={this.props.handlefilter('2019-10')}>2019 10月<span>(9)</span></a></li>
                    <li><a href="#" onClick={this.props.handlefilter('2019-09')}>2019 9月<span>(8)</span></a></li>
                    <li><a href="#" onClick={this.props.handlefilter('2019-08')}>2019 8月<span>(9)</span></a></li>
                    <li><a href="#" onClick={this.props.handlefilter('2019-07')}>2019 7月<span>(6)</span></a></li>
                    <li><a href="#" onClick={this.props.handlefilter('2019-06')}>2019 6月<span>(8)</span></a></li>
                    <li><a href="#" onClick={this.props.handlefilter('2019-05')}>2019 5月<span>(7)</span></a></li>
                    
                  </ul>
                </div>
              </div>

            </div>
          </>
        )
    }
}
export default Blog_list_right_cate