import React from 'react'
import { Link } from 'react-router-dom'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Home_container_latestevents_images extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('myfile', this.props.my_file)
    }
    // {this.props.sid}
    render() {
        return (
            <>
                <Col xl={3} lg={4} md={5} sm={12} className="p-0 d-flex justify-content-center align-content-center Container_news_figure_area;">
                    <div className="Container_News_figure">
                        <div className="Container_News_img_content">
                            <h4>BISTRO</h4>
                            <h4>MEMBER-ONLY</h4>
                            <h4>EVENT</h4>
                            <button class="navbar-toggler Container_News_img_content_btn d-flex" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <Link to={`/Latest_events_detail/${this.props.sid}`}>
                                    <span>搶先預定</span>
                                </Link>
                            </button>
                        </div>
                        <img src={`http://localhost/bistro/lib/images/Homeactivity/uploads/${this.props.picture}`} className="d-block w-100 " />
                        <div className="Container_News_text">
                            <p>{this.props.activity_name}</p>
                            {/* <p>限量25席，席位有限千萬別錯過！</p> */}
                        </div>
                    </div>
                </Col>
            </>
        )
    }
}
export default Home_container_latestevents_images