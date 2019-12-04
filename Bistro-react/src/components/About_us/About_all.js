import React from 'react'
import AOS from 'aos';
import ScrollUpButton from "react-scroll-up-button";

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/About_us/About.scss'
import Loading from '../Dining_bar/Loading'
class about_all extends React.Component {

    constructor() {
        super()
        this.state = {
            anime: false
        }
    }
    componentDidMount() {
        AOS.init({
            duration: 1750
        })
    }

    render() {
        if (this.state.anime) return <Loading />;
        return (
            <>
            <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />
                <div className="About_background">
                    <Container className="About About_share" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>

                        <div data-aos='fade-right' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/鄭文傑.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>鄭文傑</h2>
                                    <p>首頁頁面視覺動畫<br></br>
                                        關於我們頁面<br></br>
                                        購物車總流程頁面<br></br>
                                        切版與RWD<br></br>
                                        對應資料庫串接<br></br>
                                        網站前台總彙整與資料串接
                                    </p>
                                    <a href="#" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                        
                        <div data-aos='fade-right' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/龍思豪.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>龍思豪</h2>
                                    <p>
                                        總體網站UI、UX規劃設計<br></br>
                                        網站整體視覺規劃設計<br></br>
                                        部落格首頁／部落格細節頁<br></br>
                                        視覺動畫、切版與RWD<br></br>
                                        對應資料庫串接
                                    </p>
                                    <a href="https://github.com/cyruslung" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                        <div data-aos='fade-left' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/陳以十.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>陳以十</h2>
                                    <p>
                                        餐酒館預約頁<br></br>
                                        Google Map、視覺動畫<br></br>
                                        切版與RWD、加入我的收藏功能<br></br>
                                        加入購物車、結帳、訂單功能<br></br>
                                        會員紅利功能、對應資料庫串接
                                    </p>
                                    <a href="https://github.com/monkeychen528" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                        <div data-aos='fade-right' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/顏維德.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>顏維德</h2>
                                    <p>
                                        會員中心頁、會員訂單系統<br></br>
                                        視覺動畫、切版與RWD<br></br>
                                        會員註冊／登入登出與CRUD<br></br>
                                        會員活動／文章提醒系統<br></br>
                                        使用紅利功能對應資料庫串
                                    </p>
                                    <a href="https://github.com/st9866101" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                        <div data-aos='fade-left' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/謝汶宏.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>謝汶宏</h2>
                                    <p>
                                        酒類活動暨票券頁<br></br>
                                        酒類活動細節頁<br></br>
                                        視覺動畫、切版與RWD<br></br>
                                        對應資料庫串接
                                    </p>
                                    <a href="https://github.com/Xie1358" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                        <div data-aos='fade-right' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/謝忞儒.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>謝忞儒</h2>
                                    <p>
                                        會員中心頁<br></br>
                                        視覺動畫、切版與RWD<br></br>
                                        會員註冊／登入登出與CRUD<br></br>
                                        會員訂單系統／對應資料庫串接<br></br>
                                        會員活動提醒系統
                                        
                                    </p>
                                    <a href="https://github.com/kissyin520" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                        <div data-aos='fade-up' className="About_card About_share">
                            <div className="imgBx">
                                <div class="face face1 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="face face2 imgBx_img">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="contentBx">
                                <div className="content_img">
                                    <img src="../images/Logo/游千慧.jpg" alt=""></img>
                                </div>
                                <div className="content">
                                    <h2>游千慧</h2>
                                    <p>酒類商品頁／酒類商品細節頁<br></br>
                                        酒具商品頁／酒具商品細節頁<br></br>
                                        視覺動畫、切版與RWD<br></br>
                                        對應資料庫串接、部分元件動畫<br></br>
                                        企畫書與簡報
                                    </p>
                                    <a href="https://github.com/yuu-chien" target="view_window">READ ME</a>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
export default about_all