import React from 'react'
import Navigation_Navber_noImg from '../components/Navigation_Navber/Navigation_Navber_noImg'
import Blog_list_index from '../components/Blog/Blog_list_index'
// import Blog_article from '../components/Blog/Blog_article'
import Footer from '../components/Navigation_Navber/Footer'

const Blog_list = () => {
    return (
        <>
          <Navigation_Navber_noImg/>
          <Blog_list_index/>
          {/* <Blog_article /> */}
          <Footer/>
        </>
    )
}

export default Blog_list