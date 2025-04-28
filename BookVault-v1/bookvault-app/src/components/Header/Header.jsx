import React from 'react';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import "./Header.css";

const Header = () => {
  return (
    <div className="holder">
      <header className='header'>
        <Navbar />
        <div className="header-content flex flex-c text-center text-white">
          <div className="header-text-container"> 
            <h2 className='header-title'>
              Find your next read!
            </h2>
            <p className='header-text fs-18'>
              Your gateway to a world of endless stories.
            </p>
            <SearchForm />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;