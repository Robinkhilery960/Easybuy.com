import React from 'react'
import Header from "../Components/layout/Header.js"
import Hero from "../Components/Route/Hero/Hero"
import Categories from "../Components/Route/Categories/Categories"
import BestDeals from "../Components/Route/BestDeals/BestDeals"
import FeaturedProduct from "../Components/Route/FeaturedProduct/FeaturedProduct"
import Events from "../Components/Route/Events/Events"
import Sponsored from "../Components/Route/Sponsored/Sponsored"
import Footer from "../Components/layout/Footer.jsx"

const HomePage = () => {
 
  return (
    <div > 
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProduct/>
        <Sponsored/>
        <Footer/>

    </div>
  )
}

export default HomePage