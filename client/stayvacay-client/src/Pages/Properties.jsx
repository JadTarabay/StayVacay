import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBg from '../assets/Hero-bg.jpg';
import './CSS/Properties.css';
import Searchbar from '../components/Searchbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/propertyCard';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Search filter states
  const [location, setLocation] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');

  useEffect(() => {
 const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties/public');
        if (!res.ok) throw new Error('Failed to fetch properties');
        const data = await res.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const filtered = properties.filter((prop) => {
      const matchLocation = location === '' || prop.location.toLowerCase().includes(location.toLowerCase());
      const matchBeds = beds === '' || parseInt(prop.bedrooms) >= parseInt(beds);
      const matchBaths = baths === '' || parseInt(prop.bathrooms) >= parseInt(baths);
      return matchLocation && matchBeds && matchBaths;
    });

    setFilteredProperties(filtered);
  };

  return (
    <div className="properties-container">
      <Navbar />
      <div className="properties-header" style={{ backgroundImage: `url(${HeroBg})` }}>
        <h1>Explore Dubai Stays</h1>
        <div className="header-gradient"></div>
      </div>

      <div className="property-searchbar">
        <h1>Search for the Location You Want</h1>
        <Searchbar
          location={location}
          beds={beds}
          baths={baths}
          setLocation={setLocation}
          setBeds={setBeds}
          setBaths={setBaths}
          onSearch={handleSearch}
        />
      </div>

      <div className="property-listing">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property._id}
              price={property.price}
              name={property.name}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              size={property.size}
              propertyImages={property.images}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No properties found</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
