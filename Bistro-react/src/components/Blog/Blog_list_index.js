import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'
import AOS from 'aos';
import ScrollUpButton from "react-scroll-up-button";
import { StickyContainer, Sticky } from 'react-sticky';

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css'
import '../../style/Blog/css/aos.css';

//分頁連結
import Blog_list_header from './Blog_list_header'
import Blog_list_article from './Blog_list_article'
import Blog_list_article_page from './Blog_list_article_page'
import Blog_list_right_cate from './Blog_list_right_cate'
import Blog_list_right_tag from './Blog_list_right_tag'


class Blog_list_index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          list: [],
          filter:[],
          tags:[]
        }
    }

    componentDidMount() {
      fetch('http://localhost:3000/blog-content')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          list : responseJson,
        });
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
        duration : 2000
      })
      //AOS屬性說明:
      //data-aos = 呈現的效果  //fade、flip、zoom任君挑選
      //data-aos-duration = 出場持續時間  //單位是毫秒，所以1000代表1秒
      //data-aos-delay = 遲延秒數
      //data-aos-offset = 卷軸滾到多少px才觸發
      //data-aos-easing = 動畫執行速度  //個人試過覺得效果不大
      //data-aos-once = 觸發一次或上下滾動都觸發  //用true或false
      //data-aos-anchor-placement = 滾動到哪才觸發  //這邊可用top-bottom、center-bottom、bottom-bottom等屬性值，建議後面的值維持-bottom即可，若是後值改為top會發現怎麼滾了整大頁面才彈跳出來...
    
    }

    handlefilter=(value)=>()=>{
      console.log(value)

      fetch('http://localhost:3000/blog-month/'+value)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          list : responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
    }

    tagfilter=(tf)=>()=>{
      console.log(tf)

      fetch('http://localhost:3000/blog-tag/'+tf)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          list : responseJson,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
    }

    
    render() {
      let renderCount = 0;
      console.log("filter:"+this.state)
      if(!this.state.list.length) return <></>

      //解構賦值
      const {list} = this.state
      const {tags} = this.state

        return (
          <>
          <ScrollUpButton style={{width:30,height:30}} ToggledStyle={{right:10,bottom:50}}/>
          
          <Container fluid={true} style={{padding:0,marginBottom:25}}>
            <Blog_list_header />
          </Container>

          <Container className="blog-body">
            <StickyContainer>
              <Row>
             
                <Col lg={4} md={12} sm={12}  className="pull-left">
                    <Sticky topOffset={-135}>
                      {({
                        style,
                        isSticky, //( Boolean ) -> 作為當前事件導致的元素是 sticky ?
                        wasSticky, //( Boolean ) -> 在當前事件之前元素是 sticky ?
                        distanceFromTop, //( Number ) -> 從 Sticky 的頂部到 StickyContainer 的頂部的最近的像素值
                        distanceFromBottom, //( Number ) -> 從 Sticky 的底部到 StickyContainer 的底部的最近的像素值
                        calculatedHeight //此函數返回的元素的 height
                      }) => (
                        <Col lg={12} md={12} sm={12} style={{...style, marginTop: isSticky ? '135px' : '0px'}} className="pull-left">
                          <div style={{overflowX:'hidden'}}>
                            <Blog_list_right_cate handlefilter={this.handlefilter}/>
                            <Blog_list_right_tag tagfilter={this.tagfilter}/>
                          </div>
                        </Col>
                      )}
                    </Sticky>
                  </Col>

                  <Col lg={8} md={12} sm={12} className="pull-right">
                    {list.map((item)=>
                      <Blog_list_article
                        key={item.sid}
                        sid={item.sid}
                        title={item.title}
                        tag={item.tag}
                        pic={item.pic}
                        shortContent={item.shortContent}
                        content={item.content}
                        createdAt={item.createdAt}
                    />)}
                  </Col>

                  {/* <Col lg={3} md={12} sm={12} style={{overflowX:'hidden'}}>
                    <Blog_list_right_cate handlefilter={this.handlefilter}/>
                    <Blog_list_right_tag tagfilter={this.tagfilter}/>
                  </Col> */}

                  {/* <Col lg={9} md={12} sm={12}>
                    <Blog_list_article_page />
                  </Col> */}
              
              </Row>
            </StickyContainer>
          </Container>
          </>
        )
    }
}
export default Blog_list_index