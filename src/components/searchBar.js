import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/searchBar.css'

const SearchBar = (props) => {

    return (
        <div className="app-search-container">
            <img className="app-search-icon" src="/icons/search.png" alt="Search" />
            <input
                className="app-search"
                placeholder="Search property..."
                value={props.query}
                onChange={(e) => props.setQuery(e.target.value)}
            />
            <div className="app-horz-divider-28"></div>
        </div>
    );
}

export default SearchBar