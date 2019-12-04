import React from 'react'
import { Link } from 'react-router-dom'
import Navigation_Navber_noImg from '../components/Navigation_Navber/Navigation_Navber_noImg'
import Latest_events_collect from '../components/Latest_events/Latest_events_collect'
import Navigation_bg from '../components/Navigation_Navber/Navigation_bg'
import Footer from '../components/Navigation_Navber/Footer'

const Latest_events = () => {
    return (
        <>
          <Navigation_Navber_noImg/>
          <Navigation_bg/>
          {/* 商品列表頁 */}
          <Latest_events_collect/> 
          <Footer/>
        </>
    )
}


export default Latest_events