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
            <div className="sidebar-box ftco-animate pl-3 pr-3" data-aos='fade-right' data-aos-once='true'>
                <h3 className="heading mb-4">TAG CLOUD</h3>
                <div className="tagcloud">
                    <a href="#" onClick={this.props.tagfilter('紅酒')} className="tag-cloud-link">紅酒</a>
                    <a href="#" onClick={this.props.tagfilter('粉紅酒')} className="tag-cloud-link">粉紅酒</a>
                    <a href="#" onClick={this.props.tagfilter('甜白酒')} className="tag-cloud-link">甜白酒</a>
                    <a href="#" onClick={this.props.tagfilter('氣泡酒')} className="tag-cloud-link">氣泡酒</a>
                    <a href="#" onClick={this.props.tagfilter('威士忌')} className="tag-cloud-link">威士忌</a>
                    <a href="#" onClick={this.props.tagfilter('加烈酒')} className="tag-cloud-link">加烈酒</a>
                    <a href="#" onClick={this.props.tagfilter('啤酒')} className="tag-cloud-link">啤酒</a>
                    <a href="#" onClick={this.props.tagfilter('高粱酒')} className="tag-cloud-link">高粱酒</a>
                    <a href="#" onClick={this.props.tagfilter('葡萄酒')} className="tag-cloud-link">葡萄酒</a>
                    <a href="#" onClick={this.props.tagfilter('調酒')} className="tag-cloud-link">調酒</a>
                    <a href="#" onClick={this.props.tagfilter('解酒')} className="tag-cloud-link">解酒</a>
                    <a href="#" onClick={this.props.tagfilter('酒吧')} className="tag-cloud-link">酒吧</a>
                    <a href="#" onClick={this.props.tagfilter('知識')} className="tag-cloud-link">知識</a>
                    <a href="#" onClick={this.props.tagfilter('酒具')} className="tag-cloud-link">酒具</a>
                </div>
            </div>
          </>
        )
    }
}
export default Blog_article_left_cate