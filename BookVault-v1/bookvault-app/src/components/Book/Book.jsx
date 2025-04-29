import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';  
import './Book.css';
import coverImg from '../../images/cover-img.png';

const Book = ({ id, title, author, cover_id, edition_count, first_publish_year, ratings_average, ratings_count }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`full-${i}`} className="star full" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={`half-${i}`} className="star half" />);
      } else {
        stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
      }
    }

    return stars;
  };

  if (!id || !title) {
    return null;
  }

  return (
    <Link to={`/book/${id}`} className="book-item">
      <div className="book-item-img">
        <img
          src={cover_id 
            ? `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`
            : coverImg}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = coverImg;
          }}
        />
      </div>
      <div className="book-item-info">
        <div className="book-item-info-item title">{title}</div>
        <div className="book-item-info-item author"> by {author || "Unknown Author"}
          </div>
        <div className="book-item-info-item meta">
          <div className="year">Publication year: {first_publish_year}</div>
          <div className="rating-stars">
            {ratings_average > 0 ? (
              <>
                {renderStars(ratings_average)}
                <span className="rating-number">{ratings_average.toFixed(1)}</span>
                <span className="rating-count">({ratings_count} ratings)</span>
              </>
            ) : (
              <span className="no-rating">No ratings</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  cover_id: PropTypes.number,
  edition_count: PropTypes.number,
  first_publish_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ratings_average: PropTypes.number,
  ratings_count: PropTypes.number
};

export default Book;