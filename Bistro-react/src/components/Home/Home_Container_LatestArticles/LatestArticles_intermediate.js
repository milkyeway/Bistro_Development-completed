import React from 'react'
import AOS from 'aos';
//Bootstrap 標籤
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
class LatestArticles_intermediate extends React.Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        AOS.init({
            duration: 1500
        })
    }

    render() {
        return (
            <>
                <div className="M_img" data-aos='fade-up'>
                    <Col xl={12} md={4} className="figure">
                        <img src={`../images/Blog/${this.props.pic}.jpg`} />
                    </Col>
                    <Col xl={12} md={7} className="text_region">
                        <strong><p className="figure_text color1">{this.props.title}</p></strong>
                        <p className="figure_text">{this.props.shortContent}</p>
                        <Link to={`/Blog_article/${this.props.sid}`} className="figure_Latest_a post">
                            Read More
                        </Link>
                        {/* <a href="#" className="post"></a> */}
                    </Col>
                </div>
            </>
        )
    }
}
export default LatestArticles_intermediate