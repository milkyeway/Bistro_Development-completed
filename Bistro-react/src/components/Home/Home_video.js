//首頁輪播器
import React from 'react'
import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
import '../../style/HomeContainer_News/Home_video.scss'
import ReactPlayer from 'react-player';
import Loading from "../Dining_bar/Loading";

class Home_video extends React.Component {
    constructor() {
        super()
        this.state = {
            data: 0
        }
    }

    componentDidMount() {
        // setTimeout(() => {

        // }, 10000)
        //等待動畫
        // var cnt = document.getElementById("count");
        // var water = document.getElementById("water");
        // var percent = cnt.innerText;
        // var interval;
        // interval = setInterval(() => {
        //     percent++;
        //     cnt.innerHTML = percent;
        //     water.style.transform = "translate(0" + "," + (100 - percent) + "%)";
        //     if (percent === 100) {
        //         clearInterval(interval);
        //         // this.setState.data = 0
        //         document.getElementsByClassName('.Loading_box').style = 'display:none';

        //         this.setState({
        //             data: 1,
        //             alldata: ''
        //         });
        //     }
        // }, 60);
    }
    render() {
        // const style = { display: 'block' }
        // if (this.state.data === 1) style.display = 'none'

        return (
            <>
                {/* {(!this.state.data) ? <Loading /> : ''} */}
                <Navigation_Navber_noImg />
                <div className="Home_video_topbg"> </div>
                <div className="Home_video">
                    <p className="Home_video_text_p"></p>
                    {/* <Loading /> */}
                    <ReactPlayer
                        // url='https://youtu.be/4619_NQHasI'
                        url='images/BISTRO.mp4'
                        // src='./BISTRO'
                        // url='./bistro.mp4'
                        playing='true'
                        loop='true'
                        volume='0'
                        muted='true'
                    />
                    <div className="Home_video_images">
                        <p>BISTRO</p>
                    </div>
                    <div className="Home_video_text">
                        {/* BISTRO */}
                    </div>
                </div>
            </>
        )
    }
}
export default Home_video