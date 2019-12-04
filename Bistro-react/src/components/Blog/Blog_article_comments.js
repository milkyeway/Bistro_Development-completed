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

class Blog_article_comments extends React.Component {
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
    const { name, message, time } = this.props.comment;
    return (
      <>
        <div>
          <ul className="comment-list">
              <li className="comment">
                  <div className="vcard bio">
                      {/* <img src={('../images/Blog/user.jpg')} alt="Image placeholder" /> */}
                      <img
                        className="vcard bio"
                        src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`}
                        alt={name}
                      />
                  </div>
                  <div className="comment-body">
                      <h3>{name}</h3>
                      <div className="meta">{time}</div>
                      <p>{message}</p>
                      {/* <p><Link to="#" className="reply">Reply</Link></p> */}
                  </div>
                  {/* <ul className="children">
                      <li className="comment">
                          <div className="vcard bio">
                              <img src={('../images/Blog/admin.jpg')} alt="Image placeholder" />
                          </div>
                          <div className="comment-body">
                              <h3>Bistro</h3>
                              <div className="meta">November 11, 2019 at 9:25pm</div>
                              <p>謝謝您的支持，這將是我們最大的進步動力!!!!</p>
                              <p><Link to="#" className="reply">Reply</Link></p>
                          </div>
                      </li>
                  </ul> */}
              </li>
          </ul>
        </div>
      </>
    )
  }
}
export default Blog_article_comments