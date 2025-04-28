// Import React, Hooks
import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";

const BASE_URL = "https://openlibrary.org/search.json";

const AppContext = React.createContext();

const AppProvider = ({ children }) => { 

  
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultTitle, setResultTitle] = useState("Search for books");
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchBooks = useCallback(async (term) => {
    if (!term.trim()) {
      setBooks([]);
      setResultTitle("Search for books");
      return;
    }

    setLoading(true);
    setError(null);
    setBooks([]);
    setResultTitle(`Searching for "${term}"...`);

    try {
      const params = new URLSearchParams({
        q: term,
        fields: 'key,author_name,cover_i,edition_count,first_publish_year,title,ratings_average,ratings_count',
        limit: 100,
        mode: 'everything',
        format: 'json'
      });

      const apiUrl = `${BASE_URL}?${params.toString()}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.docs) {
        throw new Error('Invalid response format from API');
      }

      console.log('API Response:', data.docs[0]); // Log first book to see the structure

      const newBooks = data.docs.map((book) => {
        console.log('Book cover data:', { cover_i: book.cover_i, covers: book.covers });
        return {
          id: book.key,
          author: book.author_name?.[0] || 'Unknown Author',
          cover_id: book.cover_i,
          edition_count: book.edition_count || 0,
          first_publish_year: book.first_publish_year || 'Unknown',
          title: book.title || 'Untitled',
          ratings_average: book.ratings_average || 0,
          ratings_count: book.ratings_count || 0
        };
      });

      setBooks(newBooks);
      updateSearchHistory(term);

      setResultTitle(newBooks.length > 0
        ? `Results for "${term}"`
        : `No results for "${term}"`);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError(error.message);
      setResultTitle("Search failed");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSearchHistory = (term) => {
    if (!term.trim()) return;
    setSearchHistory(prev => {
      const newHistory = [term, ...prev.filter(t => t !== term)].slice(0, 5);
      return newHistory;
    });
  };

  const value = useMemo(() => ({
    loading,
    books,
    searchTerm,
    setSearchTerm: (term) => {
      setSearchTerm(term);
      fetchBooks(term);
    },
    resultTitle,
    error,
    searchHistory
  }), [loading, books, searchTerm, resultTitle, error, searchHistory, fetchBooks]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };
