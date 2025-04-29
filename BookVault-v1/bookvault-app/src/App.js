import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import About from './components/About/About';
import { AppProvider } from './context';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<BookList />} />
              <Route path="/book" element={<Navigate to="/search" replace />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App; 