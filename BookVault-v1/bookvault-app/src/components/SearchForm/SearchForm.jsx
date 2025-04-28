import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./SearchForm.css";

const SearchForm = ({ isBookListPage = false }) => {
  const { searchTerm, setSearchTerm, setResultTitle, loading } = useGlobalContext();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (location.pathname === '/') {
      setInputValue("");
    } else {
      setInputValue(searchTerm || "");
    }
  }, [location.pathname, searchTerm, setSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempSearchTerm = inputValue.trim();
    const cleanSearchTerm = tempSearchTerm.replace(/[^\w\s]/gi, "");

    if (!cleanSearchTerm) {
      setResultTitle("Please enter a valid search term");
    } else {
      setSearchTerm(tempSearchTerm);
      navigate("/search"); 
    }
  };

  return (
    <div className={`search-form-wrapper ${isBookListPage ? 'booklist-search-form' : ''}`}>
      <form className="search-form" onSubmit={handleSubmit} role="search">
        <div className="search-form-elem flex flex-sb bg-white">
          <input
            type="search"
            className="form-control"
            placeholder="Search your favorite book or author..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Search books"
          />
          <button
            type="submit"
            className="flex flex-c"
            aria-label="Submit search"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            ) : (
              <FaSearch className="text-white" size={24} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
