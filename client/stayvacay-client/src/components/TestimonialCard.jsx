import React from 'react';
import Quaot from '../assets/testimonials/quoat.png';
import './CSS/TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className='testimonial-card fade'>
      <div className="tc-left">
        <h2>Testimonials</h2>
        <h1>What <span>Our Clients</span> Are Saying?</h1>
        <p>{testimonial.feedback}</p>
        <div className="tcl-bottom">
          <img src={testimonial.image} alt={testimonial.name} />
          <div className="tcl-bottom-text">
            <h3>{testimonial.name}</h3>
            <p>{testimonial.country}</p>
          </div>
        </div>
      </div>
      <div className="tc-right">
        <img src={Quaot} alt="quote" />
      </div>
    </div>
  );
};

export default TestimonialCard;
