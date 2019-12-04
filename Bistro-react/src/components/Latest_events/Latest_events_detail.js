import React from 'react'
import ScrollUpButton from "react-scroll-up-button";
//樣式
import '../../style/Latest_events/Latest_events_detail.scss'
import Navigation_Navber from '../Navigation_Navber/Navigation_Navber'
import Footer from '../Navigation_Navber/Footer'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Swiper_loop_mode from './Swiper_loop_mode'
import Email_form from './Email_form'
// import Email_form from './Email_form_copy'
import Swal from 'sweetalert2'
// import ContactForm from './ContactForm'
import $ from 'jquery'
import parse from 'html-react-parser';

import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
import { /*Facebook*/
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

class Latest_events_detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // data:this.props.location.state,
            total: 0, // 數量
            total_price: 0, // 總價
            detail_data: [],
            count: 0, //test
            boolean: false,
            sid: "",
            activity_name: "",
            Introduction: "",
            picture: "",
            location: "",
            activity_start_Date: "",
            activity_end_Date: "",
            price: "",
            key: "",
            event_description: "",
            organizer: "",
        }
        // console.log(this.state.count)
        // console.log(this.state.data.activity_name)
        // console.log(this.props.match.params)
        // console.log(this.props.match.params.sid)
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props)
        if (this.props.match.params.sid !== prevProps.match.params.sid) {
            const url = ("http://localhost:3000/Latest_events_detail/" + this.props.match.params.sid)
            // console.log(666666666666666)
            this.requestToServer(url, 'GET')
        }
    }

    componentDidMount() {
        const url = ("http://localhost:3000/Latest_events_detail/" + this.props.match.params.sid)
        // console.log(666666666666666)
        // console.log(this.props.match.params)
        this.requestToServer(url, 'GET')
        $(".addtocart").click(function () {
            Swal.fire({
                title: '加入成功！',
                timer: 2000
            }).then(
                function () { },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        // console.log('I was closed by the timer')
                    }
                }
            )
        });
        // $('#aaa').click(function(){
        //     console.log('click')                 
        // //    $('#collapseExample').collapse('toggle')
        //     console.log($('#collapseExample').hasClass('show'))
        // })

        // $(".heart").click(function(){
        //     // $('.fa-heart').css("background","red");
        //     $(".events_detail_font").css({
        //         "width": 150,
        //         "height": 150,
        //         "background": "pink",
        //         "border-radius": "50%"
        //     });
        // })

    }
    // 新增一筆資料到伺服器
    addNewItemToServer = () => {
        // console.log('hi:', this.state)

        const member_sid = localStorage.getItem('member_sid')
        const sid = this.state.sid
        const activity_name = this.state.activity_name
        const total = this.state.total
        const total_price = this.state.total_price
        // console.log('member_sid:', member_sid)

        let data = {
            member_sid,
            sid,
            activity_name,
            total,
            total_price,
        }
        // console.log('hi data:', data)

        const url = 'http://localhost:3000/latest_events_addToCart'
        this.requestToServer(url, 'POST', data)
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
                    detail_data: jsonObject,
                    sid: jsonObject[0].sid,
                    price: jsonObject[0].price,
                    activity_name: jsonObject[0].activity_name,
                    Introduction: jsonObject[0].Introduction,
                    picture: jsonObject[0].picture,
                    activity_start_Date: jsonObject[0].activity_start_Date,
                    activity_end_Date: jsonObject[0].activity_end_Date,
                    location: jsonObject[0].location,
                    event_description: jsonObject[0].event_description,
                    organizer: jsonObject[0].organizer,

                })
            // console.log(jsonObject[0])
        } catch (error) {
            // Error
            this.setState({ result: error })
            console.log('錯誤訊息', error)
        }
    }

    handleClick = value => {  //react不會綁定 所以要用()=>自己綁定
        this.setState({
            total: ((this.state.total + value) < 0 ? 0 : this.state.total + value),  // 票券數小於0設成0 
            total_price: ((this.state.total + value) < 0 ? 0 : (this.state.total + value) * (this.state.price)), //總價=票券數X票價
        })
    }


    render() {
        // facebook >>>>>>>>>>>>>>>
        const shareUrl = 'http://125.227.255.79/Latest_events_pages/1';
        // const shareUrl = 'http://125.227.255.79/localhost:8000/Blog_article';
        const title = 'Bistro';
        // facebook <<<<<<<<<<<<<<<

        // const style = {
        //     'font-weight':'700',
        //     // style={style}
        // };    
        // console.log(this.props.match.params.sid)

        const { detail_data } = this.state
        // console.log(111111111)
        // console.log(this.state.detail_data[0])
        // console.log(222222222)
        return (

            <>
                {/* <Navigation_Navber /> */}

                {/* {this.state.detail_data[0]?
                 detail_data.map(data => {

                  })
                :''} */}
                <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />
                <Navigation_Navber_noImg />
                <Navigation_bg />
                <div className="Latest_events_detail_pic_border">
                    {/* 此頁fetch 此頁拿值 detail_data[0]第一次是undefined, 所以要用三元運算子先給空字串 才不會出錯, Latest_events_collect.js是fetch後傳給元件 */}
                    {this.state.detail_data[0] ?
                        detail_data.map(data => {
                            // const pictures = JSON.parse(data.picture) // 我資料庫圖片用陣列存多張,所以data.picture會拿到字串,需要JSON.parse解成陣列
                            // const activity_name
                            // console.log(1111)
                            // console.log(data.pictures[0])
                            // console.log(2222)
                            return <img key='pic1' src={`http://localhost/bistro/lib/images/activity/uploads/${JSON.parse(data.picture)[0]}`} alt="" className="" />
                        })
                        : ''}

                    {/* <img src="../images/Container_News/StockSnap_6JMD0WXXTG.jpg" alt="" className="" /> */}
                    {/* <img src={`http://localhost/bistro666/lib/images/activity/uploads/${this.state.data.picture}`} alt="" className="" /> */}
                    {/* {this.state.detail_data[0]?<img src={`http://localhost/bistro666/lib/images/activity/uploads/${JSON.parse(this.state.detail_data[0].picture)[0]}`} alt="" className="" />:''} */}

                </div>
                <Container className="events_detail_container">

                    <Row>
                        <Col sm={9}>
                            <div className="activity_name_border">
                                <h1>{this.state.activity_name}</h1>
                            </div>
                            <div className="pt-4">
                                <i class="fas fa-calendar-alt"></i>
                                <span className="events_detail_font">&emsp;活動時間</span>
                                <div className="pt-3 event_time_font">{this.state.activity_start_Date} ~ {this.state.activity_end_Date}</div>
                            </div>
                            <div className="pt-3">
                                <i class="fas fa-map-marker-alt"></i>
                                <span className="events_detail_font">&emsp;活動地點</span>
                                <div className="pt-3">{this.state.location}</div>
                            </div>
                            <div className="event_description_border">
                                {/* <i class="fas fa-map-marker-alt"></i> */}
                                {/* <span className="events_detail_font">&emsp;活動描述event_description</span> */}
                                <div className="">{this.state.event_description}</div>
                            </div>

                            <section className="pb-5">
                                <div>
                                    <div className="pt-5 events_section_title events_detail_font">活動介紹</div>
                                    <article className="pt-4">

                                        {/* { this.state.data.Introduction }  */}

                                        {parse(`${this.state.Introduction}`)}

                                        {/* {parse(`${ this.state.data.Introduction }`)} */}

                                    </article>
                                </div>
                                {/* <div className="pt-5">
                    <span>&emsp;活動地圖</span>
                    <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0101430546406!2d121.54123031537893!3d25.033729844455443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd379a5ec97%3A0xedc006d25a9e35df!2z6LOH562W5pyDIOaVuOS9jeaVmeiCsueglOeptuaJgCDmlbjkvY3kurrmiY3ln7nogrLkuK3lv4M!5e0!3m2!1szh-TW!2stw!4v1573583218606!5m2!1szh-TW!2stw" width="550" height="450" frameborder="0" allowfullscreen=""></iframe></div>
            </div> */}
                            </section>
                        </Col>

                        {/* 報名 button */}
                        <Col sm={3}>
                            <div className="py-5 sticky-top events_sign_up_body">
                                <p>
                                    <a id="aaa" class="btn btn-outline-warning events_sign_up_btn d-flex justify-content-center align-items-center" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        立即報名
                    </a>
                                    {/* <button id="btn1" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button> */}
                                </p>
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body events_card_height">
                                        <h4>NT$ {this.state.price}</h4>
                                        <br />
                                        <Button variant="secondary" style={{ fontSize: "25px", padding: "0" }} onClick={() => this.handleClick(1)}>＋</Button>
                                        <h1 className="events_total">{this.state.total} <span style={{ fontSize: "25px" }}>張</span></h1>
                                        <Button variant="secondary" style={{ fontSize: "25px", padding: "0" }} onClick={() => this.handleClick(-1)}>－</Button>
                                        <br />
                                        <h5>共NT$ {this.state.total_price} </h5>

                                        {this.state.total == 0 ?    /* 數量等於0 按鈕disabled */
                                            <Button variant="warning addtocart" disabled onClick={this.addNewItemToServer}>加入購物車</Button>
                                            : <Button variant="warning addtocart" onClick={this.addNewItemToServer}>加入購物車</Button>
                                        }
                                    </div>
                                </div>

                                <div className="heart_email">
                                    <div title="喜歡活動"><i className="fas fa-heart heart"></i></div>
                                    {/* <div title="FB分享"><i class="fab fa-facebook-f"></i></div> */}
                                    {/*  >>>Facebook  */}
                                    <div className="Demo__container">
                                        <div className="Demo__some-network">
                                            <FacebookShareButton
                                                url={shareUrl}
                                                quote={title}
                                                className="Demo__some-network__share-button bgc">
                                                <i class="fab fa-facebook-f"></i>
                                                {/* <FacebookIcon
                                                    size={32}
                                                    round 
                                                    fill={"red"}/> */}
                                                {/* iconBgStyle={"red"}/> */}
                                                {/* iconBgStyle={fill="red"}/> */}

                                            </FacebookShareButton>

                                            {/* <FacebookShareCount
                                                url={shareUrl}
                                                className="Demo__some-network__share-count">
                                                {count => count}
                                            </FacebookShareCount> */}
                                        </div>
                                        {/* 
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
                          </div> */}
                                    </div>
                                    {/*  Facebook<<<  */}
                                    {/* <div>|</div> */}
                                    {/* <div title="聯絡主辦單位" className="email_box"><i className="fas fa-envelope email"></i></div> */}
                                    <div title="" className="email_box"> <Email_form organizer={this.state.organizer} /> </div>
                                    {/* <Email_form /> */}
                                </div>

                            </div>
                        </Col>
                        {/* <Emailhtml/> */}

                        <br />
                        <br />

                    </Row>
                </Container>

                <Container className="events_Swiper_Container">
                    <div className="events_Swiper_title">
                        <p>你可能會喜歡這些活動</p>
                    </div>

                    <Swiper_loop_mode />

                </Container>

                <Footer />
            </>
        )
    }
}



export default Latest_events_detail