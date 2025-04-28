import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../context"; 
import "./Navbar.css";
import logoImg from "../../images/logo.png";

const Navbar = () => {
  const { setSearchTerm } = useGlobalContext(); 

  return (
    <nav className="navbar" id="navbar">
      <div className="container flex-sb navbar-content">


        <Link to="/" className="navbar-brand flex-c" onClick={() => setSearchTerm("")}>
          <img src={logoImg} alt="site logo" className="logo-img" />
          <span className="navbar-title">BookVault</span>
        </Link>

        <ul className="navbar-nav flex">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setSearchTerm("")}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
