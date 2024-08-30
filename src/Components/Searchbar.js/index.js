import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import { FaSearch } from 'react-icons/fa';


function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search Song, Artist"
        value={query}
        onChange={handleSearch}
      />
      <FaSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;
