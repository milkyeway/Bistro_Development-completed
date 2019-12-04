import React from 'react'
import AOS from 'aos';

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_About_us.scss'
import '../../style/animate/animate.min.css'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

class Home_About_us extends React.Component {
    componentDidMount() {
        AOS.init({
            duration: 1000
        })
    }
    constructor() {
        super()
    }

    render() {
        return (
            <>
                <div className="Home_About_us_bg" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                    <Container className="" data-aos='fade-right'>
                        <Row className="d-flex Home_About_area">
                            <Col xl={6} lg={12} className="Home_About_us_img_piece">
                                <div className="Home_About_us_frame d-flex Home_About_us_img_1">
                                    <div className="Home_About_us_img">
                                        <img src="../images/Container_News/StockSnap_YO2USSKK2K.jpg"></img>
                                    </div>
                                </div>
                                <div className="Home_About_us_frame d-flex Home_About_us_img_2">
                                    <div className="Home_About_us_img">
                                        <img src="../images/Container_News/StockSnap_SBQGCXR4AS.jpg"></img>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={6} lg={12} className="d-flex Home_About_us_textarea">
                                <div className="Home_About_us_text">
                                    <p>關於我們</p>
                                    <p>ABOUT US</p>
                                    <p>Bistro秉持著創新與整合的精神<br></br>不變的信念是<br></br>我們相信可以透過多元化的服務影響周遭的人<br></br>讓每個人更加重視生活的每個片刻</p>
                                    <p>
                                        Bistro 為結合「食」、「育」、「樂」的線上酒品媒合平台。
    除了販售各國 酒種、專業酒具與本國相關活動票券，也提供各式餐酒館和酒吧的預約服務，
    使用者可依據聚會目的和個人喜好選擇符合的餐廳。此外，Bistro 結合時下 社群趨勢，
    以部落格型式提供最新酒訊、知識專欄、選酒指南等專業文章與 報導，不論新手或老饕，
    都能在此找到最適合自己口味與需求的酒種和餐廳，
    期望藉以拉近大眾的距離，達成初衷「Believe That Control Your Life」，將品酩自然地融入日常生活。
                                    </p>
                                    <Link to="/about_us">
                                        <a href="#" className="Home_About_us_btn"><p>VIEW MORE</p></a>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}
export default Home_About_us
