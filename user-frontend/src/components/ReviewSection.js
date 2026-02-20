import React, { useState, useEffect } from 'react';
import { createComment, getOrderComments, updateComment, deleteComment } from '../api';
import './ReviewSection.css';

function ReviewSection({ orderId, customerEmail, customerName, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userComment, setUserComment] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [orderId]);

  const fetchComments = async () => {
    try {
      const response = await getOrderComments(orderId);
      setComments(response.data);
      
      // Check if current user already reviewed
      const userReview = response.data.find(c => c.customerEmail === customerEmail);
      setUserComment(userReview || null);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!reviewText.trim() || reviewText.trim().length < 5) {
      setError('Review must be at least 5 characters');
      return;
    }

    setLoading(true);
    try {
      const reviewData = {
        orderId,
        customerEmail,
        customerName,
        rating,
        comment: reviewText
      };

      if (userComment) {
        // Update existing review
        await updateComment(userComment._id, reviewData);
        setSuccess('✅ Review updated successfully!');
      } else {
        // Create new review
        await createComment(reviewData);
        setSuccess('✅ Review posted successfully!');
      }

      setReviewText('');
      setRating(5);
      setShowReviewForm(false);
      fetchComments();
      
      if (onCommentAdded) {
        onCommentAdded();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post review');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;

    setLoading(true);
    try {
      await deleteComment(userComment._id, customerEmail);
      setSuccess('✅ Review deleted successfully!');
      setUserComment(null);
      fetchComments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count, isClickable = false) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= count ? 'filled' : 'empty'}`}
            onClick={() => isClickable && setRating(star)}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : 0;

  return (
    <div className="review-section">
      <div className="review-header">
        <h3>📝 Reviews & Ratings</h3>
        {comments.length > 0 && (
          <div className="rating-summary">
            {renderStars(Math.round(averageRating))}
            <span className="avg-rating">{averageRating} / 5.0</span>
            <span className="review-count">({comments.length} {comments.length === 1 ? 'review' : 'reviews'})</span>
          </div>
        )}
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-alert">⚠️ {error}</div>}

      {!showReviewForm ? (
        <button
          className="btn-add-review"
          onClick={() => setShowReviewForm(true)}
          disabled={loading}
        >
          {userComment ? '✏️ Edit Your Review' : '⭐ Write a Review'}
        </button>
      ) : (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <div className="form-group">
            <label>Rating *</label>
            <div className="rating-input">
              {renderStars(rating, true)}
              <span className="rating-label">{rating} out of 5 stars</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reviewText">Your Review * (min. 5 characters)</label>
            <textarea
              id="reviewText"
              value={reviewText || (userComment?.comment || '')}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this order..."
              rows="4"
              maxLength="500"
            />
            <small className="char-count">
              {reviewText.length}/500 characters
            </small>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-submit-review" disabled={loading}>
              {loading ? 'Posting...' : (userComment ? 'Update Review' : 'Post Review')}
            </button>
            {userComment && (
              <button
                type="button"
                className="btn-delete-review"
                onClick={handleDeleteReview}
                disabled={loading}
              >
                Delete Review
              </button>
            )}
            <button
              type="button"
              className="btn-cancel-review"
              onClick={() => {
                setShowReviewForm(false);
                setReviewText('');
                setRating(5);
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {comments.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review! 🌟</p>
        ) : (
          comments.map(comment => (
            <div key={comment._id} className={`review-item ${comment.customerEmail === customerEmail ? 'user-review' : ''}`}>
              <div className="review-header-item">
                <div className="reviewer-info">
                  <h4>{comment.customerName}</h4>
                  {comment.customerEmail === customerEmail && (
                    <span className="badge-yours">Your Review</span>
                  )}
                </div>
                <div className="review-meta">
                  {renderStars(comment.rating)}
                  <span className="review-date">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <p className="review-text">{comment.comment}</p>
              {comment.updatedAt !== comment.createdAt && (
                <small className="edited-note">Edited</small>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewSection;