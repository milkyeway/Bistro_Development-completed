//首頁輪播器
import React from 'react'
import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
import '../../style/HomeContainer_News/Home_guests.scss'
import ReactPlayer from 'react-player';
import Loading from "../Dining_bar/Loading";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

class Home_guests extends React.Component {
    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         data: 1,
        //         alldata: ''
        //     });
        // })
        // //等待動畫
        // var cnt = document.getElementById("count");
        // var water = document.getElementById("water");
        // var percent = cnt.innerText;
        // var interval;
        // interval = setInterval(function () {
        //     percent++;
        //     cnt.innerHTML = percent;
        //     water.style.transform = "translate(0" + "," + (100 - percent) + "%)";
        //     if (percent === 100) {
        //         clearInterval(interval);
        //         // this.setState.data = 0
        //         document.getElementsByClassName('.Loading_box').style = 'display:none';
        //     }
        // }, 40);
    }
    render() {
        // if (this.state.data === 1) return <Loading />
        return (
            <>
                {/* <Loading /> */}
                <div className="Home_guests_bg">
                    <div className="Home_guests_blackbg">
                        {/* 上方浮動條 */}
                        {/* <div className="soundAnimation">
                            <div className="soundAnimationLine height_100"></div>
                            <div className="soundAnimationLine height_95"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                            <div className="soundAnimationLine"></div>
                        </div> */}
                        <div id="load">
                            <div>G</div>
                            <div>N</div>
                            <div>I</div>
                            <div>D</div>
                            <div>A</div>
                            <div>O</div>
                            <div>L</div>
                        </div>
                        {/* Believe That Control Your Life */}
                        {/* 動畫文字區域 */}
                        <div className="load_text_area">
                            <div className="load_text">
                                <span className="textgo">AWESOME</span>
                                <span className="textgo">Believe That Control Your Life</span>
                                <span className="textstop">BISTRO</span>
                            </div>
                        </div>
                        {/* Button */}
                        <div className="Home_guests_btnarea textInbtn">
                            <Link to="/" className="Home_guests_btnleft Home_guests_btn">已滿18歲</Link>
                            <a href="https://www.google.com.tw/" className="Home_guests_right Home_guests_btn">未滿18歲</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Home_guests