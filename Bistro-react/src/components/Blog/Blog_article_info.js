import React, { Component } from 'react';
import $ from 'jquery'
import AOS from 'aos';
import Markdown from './Markdown'
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
} from 'react-share';


//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css';
import '../../style/Blog/css/aos.css';
import '../../style/Blog/css/react-share.css';

import exampleImage from './react-share-pin-example.png';

//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

class Blog_article_info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  //JQ放這，render之後會觸發
  componentDidMount() {
    AOS.init({
        duration : 750
    })
  }



  render() {
    const shareUrl = 'https://reurl.cc/ZnzOOW';
    // const shareUrl = 'http://125.227.255.79/localhost:8000/Blog_article';
    const title = 'Bistro';

    return (
      <>
        <Row>
            <Col className="order-lg-last ftco-animate pt-5">
                <div>
                    <div className="mb-3 d-flex" data-aos='fade-up'>
                        <div className="mr-3">
                          <Link to="#" className="btnBlog btnBlog-light ftco-animate"><i className="fas fa-folder-open mr-2"></i>收藏</Link>
                          {/* <Link to="#" className="btnBlog btnBlog-light ftco-animate"><i className="fas fa-share-alt mr-2"></i>分享</Link> */}
                        </div>

                        <div className="Demo__container">
                          <div className="Demo__some-network">
                            <FacebookShareButton
                              url={shareUrl}
                              quote={title}
                              className="Demo__some-network__share-button">
                              <FacebookIcon
                                size={32}
                                round />
                            </FacebookShareButton>

                            <FacebookShareCount
                              url={shareUrl}
                              className="Demo__some-network__share-count">
                              {count => count}
                            </FacebookShareCount>
                          </div>

                          <div className="Demo__some-network">
                            <PinterestShareButton
                              url={String(window.location)}
                              media={`${String(window.location)}/${exampleImage}`}
                              windowWidth={1000}
                              windowHeight={730}
                              className="Demo__some-network__share-button">
                              <PinterestIcon size={32} round />
                            </PinterestShareButton>

                            <PinterestShareCount url={shareUrl}
                              className="Demo__some-network__share-count" />
                          </div>

                          <div className="Demo__some-network">
                            <EmailShareButton
                              url={shareUrl}
                              subject={title}
                              body="body"
                              className="Demo__some-network__share-button">
                              <EmailIcon
                                size={32}
                                round />
                            </EmailShareButton>
                          </div>

                          <div className="Demo__some-network">
                            <LineShareButton
                              url={shareUrl}
                              title={title}
                              className="Demo__some-network__share-button">
                              <LineIcon
                                size={32}
                                round />
                            </LineShareButton>
                          </div>
                        </div>
                    </div>
                    <Markdown>
                        {this.props.content}
                    </Markdown>
                    
                    <div className="tag-widget post-tag-container mt-4" data-aos='fade-up'>
                        <div className="tagcloud">
                            <i className="fa fa-tags" style={{color:'rgba(0, 0, 0, 0.8)'}}></i>
                            <span style={{color:'rgba(0, 0, 0, 0.8)'}}>標籤：</span>
                            <Link to="#" className="tag-cloud-link">{this.props.tag}</Link>
                        </div>
                    </div>
                </div>

            </Col>
        </Row>
      </>
    )
  }
}
export default Blog_article_info