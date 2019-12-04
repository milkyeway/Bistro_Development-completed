import React from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Wine.scss'
import '../../style/animate/animate.min.css'

class Home_wine_figure_border extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        AOS.init({
            duration: 1350
        })
    }

    // Home_Wine
    render() {
        return (
            <>
                <div className="wine_figure_border" data-aos='fade-up'>
                    <Link to={`/Wine_Tasting_detail/${this.props.sid}`} className="wine_figure">
                        <img className="wine_img" src={`http://localhost/bistro/lib/images/wine/uploads/${this.props.my_file}`}></img>
                    </Link>               
                    <div className="wine_region_2">
                        {/* 酒名 */}
                        <p className="">{this.props.name}</p>
                        {/* <div className="d-flex icon_region"> */}
                            {/* 原價 */}
                            {/* <p className="text-decoration-line-through">${this.props.price}</p> */}
                            {/* 特價 */}
                            {/* <p>${Math.floor(this.props.price * 0.9)}</p> */}
                            {/* 換一個svg */}
                            {/* <div className="d-flex flex-end ml-2 mt-1"> */}
                                {/* <a href=""> */}
                                    {/* <div className="icon_figure d-flex"> */}
                                        {/* <img className="icon_bg" src="../images/Wine_Accessories/icon-compare_wh.png"></img> */}
                                    {/* </div> */}
                                {/* </a> */}
                                {/* 收藏svg */}
                                {/* <a href=""> */}
                                    {/* <div className="icon_figure d-flex"> */}
                                        {/* <img className="icon_bg" src="../images/Wine_Accessories/icon-like_wh.png"></img> */}
                                    {/* </div> */}
                                {/* </a> */}
                                {/* 加入購物車svg */}
                                {/* <a href="">
                                    <div className="icon_figure d-flex">
                                        <img className="icon_bg" src="../images/Wine_Accessories/icon-cart_wh.png"></img>
                                    </div>
                                </a>
                            </div> */}

                        {/* </div> */}
                    </div>
                </div>
            </>
        )
    }
}
export default Home_wine_figure_border