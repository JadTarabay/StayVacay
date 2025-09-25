import React, { useState } from 'react';
import './CSS/AboutUs.css';
import ANext from '../assets/Aboutus/arrow-next.png';
import ABack from '../assets/Aboutus/arrow-prev.png';
import Property3 from '../assets/services/property3.jpg';

const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "Lead Property Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg" // Replace with your actual image paths
  },
  {
    name: "James Smith",
    position: "Marketing Specialist",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Emily Davis",
    position: "Customer Experience Lead",
    image: "https://randomuser.me/api/portraits/women/46.jpg"
  }
];

const sections = [
  {
    title: "Celebrating Excellence: Unveiling Our Identity",
    description: "At StayVacay, we’re more than a rental platform—we’re your partner in creating unforgettable stays. Based in Dubai, we specialize in managing and marketing premium vacation rentals for property owners and travelers alike. Our team blends hospitality expertise with deep local knowledge to deliver seamless experiences for every guest and stress-free hosting for every owner.",
    label: "Profile",
  },
  {
    title: "Our Full-Service Hosting Solution",
    description: "We offer a comprehensive suite of services designed to maximize your property's potential—starting with professional listing creation and high-quality photography to showcase your space. Our team handles dynamic pricing and calendar optimization to ensure competitive visibility, while our 24/7 guest communication ensures smooth stays and satisfied visitors.",
    label: "Sale",
  },
  {
    title: "Meet Our Team of Experts",
    description: "",
    label: "Team",
  }
];

const AboutUs = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const goToNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
  };

  return (
    <div className='aboutus'>
      <div className="aboutus-top">
        <h2>About Us</h2>
        <div className="aboutus-top-content">
          <h1>Get to Know Us: Leaders in <br />  Vacation <span> Rental Solutions </span></h1>
          <p>
            Discover our dedication to excellence in Dubai's vacation <br/>
            rental market—where style, service, and satisfaction lead <br/>
            the way.
          </p>
        </div>
        <div className="aboutus-top-buttons">
          {sections.map((section, index) => (
            <button
              key={index}
              className={currentSection === index ? "active" : ""}
              onClick={() => handleSectionClick(index)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="aboutus-bottom">
        <div className="aboutus-content" style={{ backgroundImage:`url(${Property3})`}}>
          <div className="aboutus-content-gradient"></div>
          <h1>{sections[currentSection].title}</h1>
          {currentSection === 2 ? (
            <div className="team-members-container" >
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                  />
                  <h3 style={{margin: 0}}>{member.name}</h3>
                  <p style={{margin: 0, color: '#ccc'}}>{member.position}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{sections[currentSection].description}</p>
          )}
          <div className="number">
            {currentSection > 0 ? (
              <button onClick={goToPrevious}><img src={ABack} alt="Previous" /></button>
            ) : (
              <span style={{ width: '42px' }} />  
            )}
            
            <h2>0{ currentSection + 1}</h2>
            
            {currentSection < sections.length - 1 ? (
              <button onClick={goToNext}><img src={ANext} alt="Next" /></button>
            ) : (
              <span style={{ width: '42px' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
