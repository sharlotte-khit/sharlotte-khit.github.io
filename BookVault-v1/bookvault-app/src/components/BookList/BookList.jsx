import React, { useState } from 'react';
import { useGlobalContext } from '../../context';
import Book from '../Book/Book';
import Loading from '../Loader/Loader';
import SearchForm from '../SearchForm/SearchForm';
import coverImg from '../../images/cover-img.png';
import './BookList.css';

const BookList = () => {
  const { books, loading, resultTitle, error } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const booksPerPage = 12;

  if (loading) return <Loading />;

  const booksWithCovers = books.map((singleBook) => ({
    ...singleBook,
    id: singleBook.id.replace("/works/", ""),
    cover_img: singleBook.covers?.[0] 
      ? `https://covers.openlibrary.org/b/id/${singleBook.covers[0]}-L.jpg` 
      : coverImg,
    first_publish_year: singleBook.first_publish_year || 'Unknown',
    ratings_average: singleBook.ratings_average || 0,
    ratings_count: singleBook.ratings_count || 0
  }));

  const sortedBooks = [...booksWithCovers].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === 'ratings') {
      return (b.ratings_average || 0) - (a.ratings_average || 0);
    }
    if (sortKey === 'first_publish_year') {
      const yearA = a.first_publish_year === 'Unknown' ? 0 : a.first_publish_year;
      const yearB = b.first_publish_year === 'Unknown' ? 0 : b.first_publish_year;
      return yearB - yearA;
    }
    if (sortKey === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="booklist">
      <div className="booklist-search">
        <div className="search-container">
          <SearchForm isBookListPage={true} />
        </div>
      </div>

      <div className="container">
        <div className="sort-controls">
          <label htmlFor="sortSelect" className="fw-500">
            Sort by:
          </label>
          <select 
            id="sortSelect"
            value={sortKey}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="">Relevance</option>
            <option value="title">Title (A-Z)</option>
            <option value="first_publish_year">Publication Year (Newest)</option>
            <option value="ratings">Ratings (Highest)</option>
          </select>
        </div>

        {currentBooks.length > 0 ? (
          <div className="booklist-content grid">
            {currentBooks.map((item) => (
              <Book key={item.id} {...item} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="no-results text-center">
              <p className="fw-500 fs-20">No books found. Try a different search term.</p>
            </div>
          )
        )}

        {sortedBooks.length > booksPerPage && (
          <div className="pagination flex flex-c">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="fw-600 fs-16"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`${currentPage === number ? 'active' : ''} fw-600 fs-16`}
              >
                {number}
              </button>
            ))}
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="fw-600 fs-16"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookList;
