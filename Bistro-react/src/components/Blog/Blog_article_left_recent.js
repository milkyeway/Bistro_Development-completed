import React from 'react'
import $ from 'jquery'
import AOS from 'aos';


//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css'
import '../../style/Blog/css/aos.css';


//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

class Blog_article_left_cate extends React.Component {
    constructor(props) {
        super(props)
    }
    //JQ放這
    componentDidMount() {
        AOS.init({
            duration : 1500
        })
    }

    render() {
        return (
          <>
            <div className="sidebar-box ftco-animate pl-3 pr-3">
                {/* <h3 className="heading mb-4" data-aos='fade-right'>RECENT BLOG</h3> */}
                <div className="block-21 mb-4 d-flex" data-aos='fade-right' data-aos-once='true'>
                    <Link to={{pathname:`/Blog_article/${this.props.sid}`}} className="blog-img mr-4" style={{backgroundImage: 'url('+`../images/Blog/${this.props.pic}.jpg`+')'}}>
                        <img src="{this.props.pic}" alt=""/>
                    </Link>
                    <div className="text">
                        <h3><Link to={{pathname:`/Blog_article/${this.props.sid}`}}>{this.props.title}</Link></h3>
                        <div className="meta">
                            <div><Link to={{pathname:`/Blog_article/${this.props.sid}`}}><i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;{this.props.createdAt}</Link></div>
                        </div>
                    </div>
                </div>
            </div>
          </>
        )
    }
}
export default Blog_article_left_cate