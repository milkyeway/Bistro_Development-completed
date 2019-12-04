// 酒商品頁
import React from 'react'
import { Link } from 'react-router-dom'
import Navigation_Navber_noImg from '../components/Navigation_Navber/Navigation_Navber_noImg'
import Wine_Tasting_index from '../components/Wine_Tasting/Wine_Tasting_index'
import Footer from '../components/Navigation_Navber/Footer'
import Navigation_bg from '../components/Navigation_Navber/Navigation_bg'


const Wine_tasting = () => {
    return (
        <>
            <Navigation_Navber_noImg/>
            <Navigation_bg/>
            <Wine_Tasting_index/>
            <Footer/>
        </>
    )
}


export default Wine_tasting