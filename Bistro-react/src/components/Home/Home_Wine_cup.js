import React from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Wine.scss'
import '../../style/animate/animate.min.css'

class Home_Wine_cup extends React.Component {
    componentDidMount() {
        AOS.init({
            duration: 1350
        })        
    }
    constructor(props) {
        super(props)
        // console.log("match" + this.props.sid)
    }
// /Wine_Tasting_detail/
    render() {
        return (
            <>
                {/* <Link to={`/Wine_Tasting_detail/${this.props.sid}`}>

                </Link> */}
                <div className="Wine_cupimages" data-aos='fade-up'>
                    <img onClick={this.props.onClick} className="wine_svg" src="../images/Wine_Accessories/glasses.svg"></img>
                    <p>{this.props.kind}</p>
                </div>

            </>
        )
    }
}
export default Home_Wine_cup
