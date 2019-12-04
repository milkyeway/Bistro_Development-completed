import React from 'react'
import $ from 'jquery'
import AOS from 'aos';
import Markdown from './Markdown'


//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css'
import '../../style/Blog/css/aos.css';

//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

class Blog_list_article extends React.Component {
  constructor(props) {
    super(props)
    console.log("match"+this.props.sid)
  }

  //JQ放這，render之後會觸發
  componentDidMount() {
    AOS.init({
      duration : 750
    })

    $(function(){
      var len = 100; // 超過100個字以"..."取代
      $(".JQellipsis").each(function(i){
          if($(this).text().length>len){
              $(this).attr("title",$(this).text());
              var text=$(this).text().substring(0,len-1)+"...";
              $(this).text(text);
          }
      });
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col className="ftco-animate">

            <div className="blog-entry d-lg-flex" data-aos='fade-up'>
              <div className="half">
                <Link to={`Blog_article/${this.props.sid}`} className="img d-flex align-items-end" style={{backgroundImage: 'url('+`../images/Blog/${this.props.pic}.jpg`+')'}}>
                  <div className="overlay"></div>
                </Link>
              </div>
              <div className="text px-md-4 px-lg-5 half pt-3">
                <p className="meta d-flex">
                  <span className="ml-auto pl-3">{this.props.createdAt}</span>
                </p>
                <h3><Link to={`Blog_article/${this.props.sid}`}>{this.props.title}</Link></h3>
                <p>{this.props.shortContent}</p>
                <p className="mb-0">
                  <Link to={`Blog_article/${this.props.sid}`} className="btnBlog btnBlog-primary">Read More <i class="fas fa-long-arrow-alt-right"></i></Link>
                </p>
              </div>
            </div>

          </Col>
        </Row>
      </>
    )
  }
}
export default Blog_list_article