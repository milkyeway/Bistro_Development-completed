import React from 'react'
import AOS from 'aos';
//酒類活動
//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Container_LatestEvents.scss'
import Home_container_latestevents_images from './Home_container_latestevents_images'
import '../../style/animate/animate.min.css'

class Home_Container_LatestEvents extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goods: [],
            filter: []
        }
    }
    componentDidMount() {
        AOS.init({
            duration: 1750
        })
        fetch('http://localhost:3000/Home_Container_LatestEvents')
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

    render() {
        // console.log('parent')
        if (!this.state.goods.length) return <></>

        //解構賦值
        const { goods } = (this.state)
        // console.log(goods[0]['picture'])

        const goodsOne = []
        const goodsTwo = []

        for (let i = 0; i < 8; i++) {
            const obj = {
                picture: JSON.parse(this.state.goods[i].picture),
                activity_name: this.state.goods[i].activity_name,
                sid: this.state.goods[i].sid,
            }
            if (i < 4) {
                goodsOne.push(obj)
            } else {
                goodsTwo.push(obj)
            }
            // goodsOne.push(JSON.parse(goods[i]['picture']))
            // const goodlol = { picture: JSON.parse(goods[i]['picture']), activity_name: JSON.parse(goods[i]['activity_name']) }
            // goodsOne.push(goodlol)
        }


        console.log('goodOne', goodsOne)

        // for (let i = 4; i < 8; i++) {
        //     goodsTwo.push(JSON.parse(goods[i]['picture']))
        // }
        console.log('goodsOne', goodsOne)
        // const goodsOne_ = [goods[0], goods[1], goods[2], goods[3]]
        return (
            <>
                <div className="Home_Container_LatestEvents_Bg_img">
                    <Container>
                        <h3 className="pt-95">LAIESI&ensp;EVENIS</h3>
                        <div style={{ overflowX: 'hidden' }}>
                            <Row data-aos='fade-left' className="mt-5_1 d-flex justify-content-center Home_images_area" >
                                {goodsOne.map((item) => <Home_container_latestevents_images picture={item.picture[0]} activity_name={item.activity_name} sid={item.sid}/>
                                )}
                            </Row>
                            <Row data-aos='fade-right' className="mt-5_2" >
                                {goodsTwo.map((item) => <Home_container_latestevents_images picture={item.picture[0]} activity_name={item.activity_name} sid={item.sid}/>
                                )}
                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
export default Home_Container_LatestEvents
