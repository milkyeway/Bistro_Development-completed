import React from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Wine.scss'
import '../../style/animate/animate.min.css'
import Home_Wine_cup from './Home_Wine_cup'
import Home_wine_figure_border from './Home_wine_figure_border'
class Home_Wine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goods: [],
            filterGoods: []
        }
    }
    componentDidMount() {
        AOS.init({
            duration: 1750
        })
        fetch('http://localhost:3000/Home_Wine')
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
    handleClick = (kind) => {
        fetch('http://localhost:3000/Home_Wine_good?kind=' + kind)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    filterGoods: responseJson,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // Home_Wine
    render() {
        if (!this.state.goods.length) return <></>

        //解構賦值
        const { goods, filterGoods } = (this.state)
        return (
            <>
                <div className="Home_Wine_bg">
                    <Container className="w-100">
                        <h3>LAIESI&ensp;WINE</h3>
                        <div className="img_wine d-flex">
                            {goods.map((item) =>
                                <Home_Wine_cup
                                    sid={item.sid}
                                    kind={item.kind} //種類
                                    onClick={() => this.handleClick(item.kind)}
                                />
                            )}
                        </div>
                    </Container>
                    <div className="wine_region d-flex">
                        {filterGoods.map((filter) =>
                            <Home_wine_figure_border
                                sid={filter.sid}
                                name={filter.name} //酒名
                                price={filter.price} //價錢
                                my_file={filter.my_file}
                            />
                        )}
                    </div>
                </div>
            </>
        )
    }
}
export default Home_Wine
