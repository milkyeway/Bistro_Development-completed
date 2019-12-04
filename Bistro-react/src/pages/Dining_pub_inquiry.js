import React from 'react'
import { Link } from 'react-router-dom'
import Navigation_Navber_noImg from '../components/Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../components/Navigation_Navber/Navigation_bg'
import Dining_bar_list from "../components/Dining_bar/Dining_bar_list";
import Footer from '../components/Navigation_Navber/Footer'



const Dining_pub_inquiry = () => {
    return (
        <>
           <Navigation_Navber_noImg/>
           <Navigation_bg/>
           <Dining_bar_list />
            <Footer/>
        </>
    )
}


export default Dining_pub_inquiry