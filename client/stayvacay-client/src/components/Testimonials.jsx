// Testimonials.jsx
import React, { useState, useEffect } from 'react';
import './CSS/Testimonials.css';
import testimonials from '../assets/testimonials/testimonials';
import TestimonialCard from './TestimonialCard';
import Client from '../assets/testimonials/client.jpg';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='testimonials'>
      <div className="testimonial-image">
        <img src={Client} alt="Client" />
      </div>
      <div className="testimonials-section">
        <TestimonialCard testimonial={testimonials[current]} />
        <div className="dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={current === index ? 'dot active' : 'dot'}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
