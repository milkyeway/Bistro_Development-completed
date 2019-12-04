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

class Blog_list_header extends React.Component {
  constructor(props) {
    super(props)
  }
  //JQ放這，render之後會觸發
  componentDidMount() {
    AOS.init({
      duration : 750
    })
  }

  render() {
    return (
      <>
        <section className="hero-wrap hero-wrap-2 mb-4" style={{backgroundImage: 'url('+'../images/Blog/bg.jpg'+')'}}>
          <div className="overlay"></div>
          <Container>
              <Row className="no-gutters slider-text align-items-end justify-content-center">
                  <Col className="ftco-animate pb-5 text-center" data-aos='fade-up'>
                      <h1 className="mb-3 bread">Knowledge Blog</h1>
                  </Col>
              </Row>
          </Container>
        </section>
      </>
    )
  }
}
export default Blog_list_header