import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import PopularListings from '../components/PopularListings';

const Home= () =>  {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <PopularListings />
      {/* <Services />
      <AboutUs />
      <Testimonials />
      <ContactForm />
      <Footer /> */}
    </div>
  )
}

export default Home;
