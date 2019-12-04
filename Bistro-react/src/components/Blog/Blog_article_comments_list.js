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
import Blog_article_comments from './Blog_article_comments'

class Blog_article_comments_list extends React.Component {
  constructor(props) {
    super(props)
  }
  //JQ放這，render之後會觸發
  componentDidMount() {
    // INSERT INTO blog_reply (`sid`, `content`, `createdAt`, `updatedAt`, `commentId`, `userId`) VALUES (null, '${content}', '${createdAt}', '${updatedAt}', '${commentId}', '${userId}')

    AOS.init({
        duration : 750
    })
  }

  render() {
    return (
      <>
        <div className="pt-5 mt-5" data-aos='fade-up'>
            <h3 className="mb-5">{this.props.comments.length}{" "}
            Comment{this.props.comments.length > 0 ? "s" : ""}</h3>
            {this.props.comments.length === 0 && !this.props.loading ? (
            <div className="alert text-center alert-info">
              Be the first to comment
            </div>
            ) : null}
        </div>

        {this.props.comments.map((comment, index) => (
        <Blog_article_comments key={index} comment={comment} />
      ))}
      </>
    )
  }
}
export default Blog_article_comments_list