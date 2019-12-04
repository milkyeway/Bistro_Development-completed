import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'
import AOS from 'aos';
import ScrollUpButton from "react-scroll-up-button";
import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'


//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css'
import '../../style/Blog/css/aos.css';

//分頁連結
import Blog_article_info from './Blog_article_info'
import Blog_article_left_cate from './Blog_article_left_cate'
import Blog_article_left_recent from './Blog_article_left_recent'
import Blog_article_left_tag from './Blog_article_left_tag'
import Blog_article_comments_list from './Blog_article_comments_list'
import Blog_article_comments from './Blog_article_comments'
import Blog_article_comments_post from './Blog_article_comments_post'
import Footer from '../Navigation_Navber/Footer'

class Blog_article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      recentItem: [],
      tags: [],
      comments: [],
      loading: false
    }
    this.addComment = this.addComment.bind(this);
    console.log(this.props.match.params)
  }

  componentDidUpdate(prevProps) {
    console.log(this.props)
    if (this.props.match.params.sid !== prevProps.match.params.sid) {
      // const url = ("http://localhost:3000/blog-content/"+this.props.match.params.sid)
      // this.requestToServer(url, 'GET')
      fetch("http://localhost:3000/blog-content/" + this.props.match.params.sid)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            content: responseJson,
          });
          console.log(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/blog-content/" + this.props.match.params.sid)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          content: responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://localhost:3000/blog-content/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          recentItem: responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://localhost:3000/blog-recent5/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          recentItem: responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });

    // fetch('http://localhost:3000/blog-tag/')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //     tags : responseJson,
    //   });
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    //AOS Animate
    AOS.init({
      duration: 2000
    })


    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("http://localhost:7777")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  /**
   * Add new comment
   * @param {Object} comment
  */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  handlefilter = (value) => () => {
    console.log(value)

    fetch('http://localhost:3000/blog-month/' + value)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          content: responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  tagfilter = (tf) => () => {
    console.log(tf)

    fetch('http://localhost:3000/blog-tag/' + tf)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          content: responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  requestToServer = async (url, method, data = {}) => {
    // GET方法不有body，先設定出樣版物件
    const requestTemplate = new Request(url, {
      method: method,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    let req = requestTemplate

    // 如果不是GET再加上body
    if (method !== 'GET')
      req = new Request(requestTemplate, { body: JSON.stringify(data) })

    try {
      const response = await fetch(req)
      const jsonObject = await response.json()
      if (method === 'GET')
        this.setState({
          data_oj: jsonObject,
          title: jsonObject[0].title,
          tag: jsonObject[0].tag,
          pic: jsonObject[0].pic,
          shortContent: jsonObject[0].shortContent,
          content: jsonObject[0].content,
          createdAt: jsonObject[0].createdAt,
        })
    } catch (error) {
      // Error
      this.setState({ result: error })
      console.log('錯誤訊息', error)
    }
  }


  render() {
    if (!this.state.content.length) return <></>
    if (!this.state.recentItem.length) return <></>

    //解構賦值
    const { content, recentItem } = this.state
    const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";

    return (
      <>
        <Navigation_Navber_noImg />
        <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />

        <Container className="d-none d-lg-block">
          <Row>
            <Col lg={12}>
              <br /><br /><br /><br />
            </Col>
          </Row>
        </Container>

        <Container className="blog-body">
          <Row>
            <Col lg={4} md={12} sm={12} id="left_menu" style={{ overflowX: 'hidden' }}>
              <Row>
                <Col className="sidebar pr-lg-5 ftco-animate pt-5">
                  {/* <Blog_article_left_cate handlefilter={this.handlefilter}/> */}
                  <h3 className="heading mb-4 pl-3 pr-3" data-aos='fade-right'>RECENT 5 BLOGS</h3>
                  {recentItem.map((rt) => (
                    <Blog_article_left_recent
                      sid={rt.sid}
                      title={rt.title}
                      tag={rt.tag}
                      pic={rt.pic}
                      shortContent={rt.shortContent}
                      content={rt.content}
                      createdAt={rt.createdAt}
                    />))}
                  {/* <Blog_article_left_recent2 /> */}
                  <Blog_article_left_tag tagfilter={this.tagfilter} />
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={12} sm={12} id="main_area">
              {content.map((info, i) => (
                <Blog_article_info
                  key={i}
                  title={info.title}
                  tag={info.tag}
                  pic={info.pic}
                  shortContent={info.shortContent}
                  content={info.content}
                  createdAt={info.createdAt}
                />))}

              <Row>
                <Col className="order-lg-last ftco-animate">
                  <Blog_article_comments_list
                    loading={this.state.loading}
                    comments={this.state.comments}
                  />
                  <Blog_article_comments_post addComment={this.addComment} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    )
  }
}
export default Blog_article