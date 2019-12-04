import React from 'react'
import { Link } from 'react-router-dom'
import Navigation_Navber_noImg from '../components/Navigation_Navber/Navigation_Navber_noImg'
import Wine_accessories_index from '../components/Wine_Accessories/Wine_accessories_index'
import Footer from '../components/Navigation_Navber/Footer'
import Navigation_bg from '../components/Navigation_Navber/Navigation_bg'


const Wine_accessories = () => {
    return (
        <>
          <Navigation_Navber_noImg/>
          <Navigation_bg/>
          {/* 商品列表頁 */}
          <Wine_accessories_index/> 
          <Footer/>
        </>
    )
}


export default Wine_accessories