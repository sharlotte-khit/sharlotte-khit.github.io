import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loader/Loader";
import "./BookDetails.css";
import coverImg from "../../images/cover-img.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const requestOptions = { 
    method: "GET", 
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'omit'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [workRes, ratingsRes, editionsRes] = await Promise.all([
          fetch(`https://openlibrary.org/works/${id}.json`, requestOptions),
          fetch(`https://openlibrary.org/works/${id}/ratings.json`, requestOptions),
          fetch(`https://openlibrary.org/works/${id}/editions.json`, requestOptions)
        ]);

        if (!workRes.ok) throw new Error("Failed to fetch book details");

        const workData = await workRes.json();
        const ratingsData = ratingsRes.ok ? await ratingsRes.json() : null;
        const editionsData = editionsRes.ok ? await editionsRes.json() : null;

        let authorData = null;
        if (workData.authors && workData.authors[0]) {
          const authorKey = workData.authors[0].author.key;
          const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`, requestOptions);
          if (authorRes.ok) authorData = await authorRes.json();
        }

        const edition = editionsData?.entries?.[0] || {};

        setBook({
          title: workData.title || "Untitled",
          description: workData.description?.value || workData.description || "No description available.",
          coverId: edition.covers?.[0] || workData.covers?.[0],
          firstPublished: workData.first_publish_date || edition.publish_date || "Unknown",
          publisher: edition.publishers?.[0] || "Unknown Publisher",
          isbn: edition.isbn_10?.[0] || edition.isbn_13?.[0] || "Not available",
          ratingsAverage: ratingsData?.summary?.average || 0,
          ratingsCount: ratingsData?.summary?.count || 0,
          language: edition.languages?.[0]?.key.split("/").pop() || "Unknown",
          pages: edition.number_of_pages || "Unknown"
        });

        setAuthorInfo({
          name: authorData?.name || "Unknown Author"
        });

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <section className="book-details">
        <div className="container text-center">
          <h2>Error loading book details</h2>
          <button onClick={() => navigate(-1)} className="btn-back">← Back to Results</button>
        </div>
      </section>
    );
  }

  const coverUrl = book.coverId 
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
    : coverImg;

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

  return (
    <section className="book-details">
      <div className="container">

        <div className="back-button">
          <button onClick={() => navigate(-1)} className="btn-back">← Back to Results</button>
        </div>

        <div className="details-grid">
          <div className="left-column">
            <div className="cover-wrapper">
              <img src={coverUrl} alt={`${book.title} Cover`} />
            </div>
          </div>

          <div className="info-wrapper">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">by {authorInfo.name}</p>
            
            <div className="book-meta">
              <div className="meta-item">
                <span className="meta-label">Publication Year:</span>
                <span className="meta-value">{book.firstPublished}</span>
              </div>
              
              <div className="ratings">
                {renderStars(book.ratingsAverage)} 
                <span className="rating-number">{book.ratingsAverage.toFixed(1)}</span> 
                <span className="rating-count">({book.ratingsCount} ratings)</span>
              </div>
            </div>

            <div className="description">
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
