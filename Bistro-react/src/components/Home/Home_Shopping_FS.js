import React from 'react'
import AOS from 'aos';

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Shopping_FS.scss'
import '../../style/animate/animate.min.css'

class Home_Shopping_FS extends React.Component {
    componentDidMount() {
        AOS.init({
            duration: 1750
        })
    }
    constructor() {
        super()
    }

    // a = (props) => () => {

    // }

    render() {
        return (
            <>
                <div className="Home_Shopping_FS_bg" data-aos='fade-up' data-aos-easing="linear"
                    data-aos-duration="1500">
                    <div className="d-flex justify-content-space-between Title_text transition_05">
                        <p className="line"></p>
                        <h3 className="">SHOPPING&ensp;FLOW&nbsp;STEPS</h3>
                        <p className="line"></p>
                    </div>
                    <Container className="d-flex Shooping_area transition_05">
                        <div className="Shopping_FS_Block transition_05">
                            <div className="Shopping_FS_svg ">
                                <img src="../images/Wine_Accessories/step1.svg"></img>
                                <p>挑選商品</p>
                                <p>逛逛您喜歡的餐酒館／酒種／酒具／實體活動</p>
                            </div>
                            <div className="Shopping_FS_text transition_05">
                                <p>→</p>
                            </div>
                        </div>
                        <div className="Shopping_FS_Block transition_05">
                            <div className="Shopping_FS_svg">
                                <img src="../images/Wine_Accessories/step2.svg"></img>
                                <p>加入購物車</p>
                                <p>會員登入或會員註冊後，點選加入購物車</p>
                            </div>
                            <div className="Shopping_FS_text transition_05">
                                <p>→</p>
                            </div>
                        </div>
                        <div className="Shopping_FS_Block transition_05">
                            <div className="Shopping_FS_svg">
                                <img src="../images/Wine_Accessories/step3.svg"></img>
                                <p>訂單確認</p>
                                <p>確認訂單明細，輸入收件地址與使用專屬紅利</p>
                            </div>
                            <div className="Shopping_FS_text transition_05">
                                <p>→</p>
                            </div>
                        </div>
                        <div className="Shopping_FS_Block transition_05">
                            <div className="Shopping_FS_svg">
                                <img src="../images/Wine_Accessories/step4.svg"></img>
                                <p>快速出貨</p>
                                <p>我們將於訂單成立隔日以快遞寄送選購的商品</p>
                            </div>
                            <div className="Shopping_FS_text transition_05">
                                <p>→</p>
                            </div>
                        </div>
                        <div className="Shopping_FS_Block transition_05">
                            <div className="Shopping_FS_svg">
                                <img src="../images/Wine_Accessories/step5.svg"></img>
                                <p>ENJOY IT</p>
                                <p>BISTRO點綴您品酩的每個時刻</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
export default Home_Shopping_FS
