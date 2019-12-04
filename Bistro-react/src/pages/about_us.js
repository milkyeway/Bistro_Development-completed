import React from 'react'
import Navigation_Navber_noImg from '../components/Navigation_Navber/Navigation_Navber_noImg'
import About_all from '../components/About_us/About_all'
import Footer from '../components/Navigation_Navber/Footer'
import Navigation_bg from '../components/Navigation_Navber/Navigation_bg'
import FsLightbox from 'fslightbox-react';


// import Carousel from '../components/Navigation_Navber/Carousel'

const about_us = () => {
    return (
        <>
           <Navigation_Navber_noImg/>
           <Navigation_bg/>
           <About_all/>
           <Footer />
        </>
    )
}


export default about_us