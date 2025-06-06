import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import PopularListings from '../components/PopularListings';
import Services from '../components/Services';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home= () =>  {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="stays">
        <PopularListings />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="review">
        <Testimonials />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home;
