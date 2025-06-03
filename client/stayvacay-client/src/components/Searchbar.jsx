import React from 'react';
import './CSS/SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ location, beds, baths, setLocation, setBeds, setBaths, onSearch }) => {
  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <div className="searchbar-inputs">
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Beds"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Baths"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
          />
          <button className="search-button" onClick={onSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
