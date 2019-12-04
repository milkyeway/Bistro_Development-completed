//首頁輪播器
import React from 'react'
import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
class Carousel extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <>
             <Navigation_Navber_noImg />
                {/* <Navigation_bg /> */}
                <div className="Carousel_bg"></div>
                {/* <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active vh-100">
                            <img src="../images/HomeCarousel/champagne-4075806_1920.jpg" className="d-block w-100 h-100 background-size-cover" style={{ "objectFit": "cover" }} alt />
                        </div>
                        <div className="carousel-item vh-100">
                            <img src="../images/HomeCarousel/StockSnap_6JMD0WXXTG.jpg" className="d-block w-100 h-100 background-size-cover" style={{ "objectFit": "cover" }} alt />
                        </div>
                        <div className="carousel-item vh-100">
                            <img src="../images/HomeCarousel/StockSnap_6JMD0WXXTG.jpg" className="d-block w-100 h-100 background-size-cover" style={{ "objectFit": "cover" }} alt />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div> */}
            </>
        )
    }
}
export default Carousel