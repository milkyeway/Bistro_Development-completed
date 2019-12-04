import React from 'react'
// import { Link } from 'react-router-dom'
import Carousel from '../components/Home/Carousel'
import Home_guests from '../components/Home/Home_guests'
import Home_video from '../components/Home/Home_video'
import Home_Container_LatestEvents from '../components/Home/Home_Container_LatestEvents'
import Home_Container_LatestArticles from '../components/Home/Home_Container_LatestArticles'
import Home_Wine from '../components/Home/Home_Wine'
import Home_Shopping_FS from '../components/Home/Home_Shopping_FS'
import Home_About_us from '../components/Home/Home_About_us'
import Home_Fome from '../components/Home/Home_Fome'
import Footer from '../components/Navigation_Navber/Footer'
import '../style/Blog/css/aos.css';
import ScrollUpButton from "react-scroll-up-button";

// 照片燈箱 Home_video

// import Choosen from "../Chosen" Home_guests


const Home = () => {
   
    return (
        <>        
            {/* <Home_guests /> */}
            {/* <Carousel /> */}
            <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />            
            <Home_video />
            <Home_Container_LatestEvents />
            <Home_Container_LatestArticles />
            <Home_Wine/>
            <Home_Shopping_FS/>
            <Home_About_us/>
            <Home_Fome/>
            <Footer />
        </>
    )
}


export default Home