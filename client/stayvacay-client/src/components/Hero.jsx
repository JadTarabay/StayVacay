import HeroBg from '../assets/Hero-bg.jpg';
import Union from '../assets/Union.png';
import Clients from '../assets/clients.png';
import { FaArrowRight } from "react-icons/fa6";
import './CSS/Hero.css';
import miniHeroBg from '../assets/mini-hero-bg.png';
import Tick from '../assets/Tick.png';
import { FaBell } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="Hero" style={{ backgroundImage:`url(${HeroBg})`}}>
     <div className="gradient"></div>
     <div className="hero-container">
        <div className="top">
            <h2>Experience Unforgettable Stays</h2>
        </div>
        <div className="middle">
            <h1>Where <span> Relaxation </span> Meets Style <br/>Stay Luxuriously, Stay Affordable</h1>
        </div>
        <div className="bottom">
            <div className="left">
                <img src={Union} alt="union"/>
                <div className="tabs">
                  <h2>Popular</h2>
                  <h1>Exclusive</h1>
                </div>
                <div className="tab-content">
                  <div className="content-left">
                    <h2>Oceanfront Villa <br/>with Private Pool</h2>
                    <div className="clients">
                      <img src={Clients} alt="clients" />
                      <p>100+ <br/> Happy Guests</p>
                    </div>
                  </div>
                  <div className="content-right" style={{ backgroundImage:`url(${miniHeroBg})`}}>
                    <div className="content-right-top">
                      <h2>Luxury Cabin Retreat</h2>
                      <FaArrowRight className='arrow'/>
                    </div>
                    <div className="content-right-bottom">
                     <p>Breathtaking mountain views, modern rustic interior, fully equipped.......</p>
                    </div>
                  </div>
                </div>
              </div>
           
            <div className="right">
                <div className="messages">
                  <div className="message-top">
                    <FaBell className="bell" />
                    <h2>Customer gets notification</h2>
                  </div>
                  <div className="message-bottom">
                    <div className="message">
                      <img src={Tick} alt="tick" />
                      <div className="message-text">
                        <h2>Early-Bid Discounts</h2>
                        <p>Seasonal offers, first to know.</p>
                      </div>
                    </div>
                    <div className="message">
                      <img src={Tick} alt="tick" />
                      <div className="message-text">
                        <h2>New Properties Available</h2>
                        <p>Fresh stays, right away.</p>
                      </div>
                    </div>
                    <div className="message">
                      <img src={Tick} alt="tick" />
                     <div className="message-text">
                       <h2>Stay Reminders</h2>
                       <p>Never miss a check-in.</p>
                     </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
     </div>
    </section>
  )
}

export default Hero;
