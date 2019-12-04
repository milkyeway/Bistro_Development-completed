import React from 'react'
import AOS from 'aos';

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Container_LatestArticles.scss'

import LatestArticles_intermediate from './Home_Container_LatestArticles/LatestArticles_intermediate'
import LatestArticles_laft_right from './Home_Container_LatestArticles/LatestArticles_laft_right'
class Home_Container_LatestArticles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bigGoods: []
        }
    }
    componentDidMount() {
        AOS.init({
            duration: 1500
        })
        fetch('http://localhost:3000/Home_Container_LatestArticles')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    bigGoods: responseJson,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        // console.log('parent')
        if (!this.state.bigGoods.length) return <></>
        //解構賦值
        const { bigGoods } = (this.state)
        // console.log(bigGoods[0]['pic'])

        let LAleft = bigGoods.splice(0, 3);         //左邊區域
        let LAintermediate = bigGoods.splice(0, 1); //中間區域
        let LAright = bigGoods.splice(0, 3);        //右邊區域

        return (
            <>
                <div className="Home_Container_LatestArticles_Bg_img">
                    <Container>
                        <h3 className="pt-95">LAIESI&ensp;ARTICLES</h3>
                        <Row className="d-flex">
                            <Col xl={3} lg={12} className="flex-row LatestArticles_Area1" style={{ overflow: 'hidden'}}>
                                {LAleft.map((item) =>
                                    <LatestArticles_laft_right data-aos='fade-right'
                                        sid={item.sid}
                                        title={item.title}
                                        pic={item.pic}
                                        shortContent={item.shortContent}
                                    />
                                )}
                            </Col>
                            <Col xl={6} lg className="LatestArticles_Area2" style={{ overflowY: 'hidden'}}>
                                {LAintermediate.map((item) =>
                                    <LatestArticles_intermediate
                                        sid={item.sid}
                                        title={item.title}
                                        pic={item.pic}
                                        shortContent={item.shortContent}
                                    />
                                )}
                            </Col>
                            <Col xl={3} lg={12} className="LatestArticles_Area3 flex-row" style={{ overflow: 'hidden'}}>
                                {LAright.map((item) =>
                                    <LatestArticles_laft_right
                                        sid={item.sid}
                                        title={item.title}
                                        pic={item.pic}
                                        shortContent={item.shortContent}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}
export default Home_Container_LatestArticles
