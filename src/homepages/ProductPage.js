import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css'; // Import the CSS file for styling

// Component pentru evaluarea cu stele
const StarRating = ({ rating, onChange }) => {
  const stars = [];

  const handleClick = (newRating) => {
    onChange(newRating);
  };

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className="star" onClick={() => handleClick(i)}>
        {i <= rating ? '\u2605' : '\u2606'}
      </span>
    );
  }

  return <div>{stars}</div>;
};

const ProductPage = ({ product , email }) => {
  // Ensure product.Path is converted to string
  const imagePath = String(product.Path);
  const [newOrder, setNewOrder] = useState({ quantity: 1, size: '' }); // Initialize quantity with 1
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/${product.Nume}`);

      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setNewRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newOrder.size) {
      setErrorMessage('Select a size before adding to cart.');
      return;
    }
    try {
      console.log(product);
      product.Stare = email;
      const copie = product.Cantitate;
      product.Cantitate = newOrder.quantity;
      const copie2 = product.Marime;
      product.Marime = newOrder.size;
      // Include size in the product object sent to the server
      await axios.post('http://localhost:5000/api/orders', product);
      product.Cantitate = copie;
      product.Marime = copie2;
      // Optionally, reset the form state after successful submission
      setNewOrder({ quantity: 1, size: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Error adding product. Please try again later.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newRating === 0) {
      setErrorMessage('Please select a rating before posting a comment.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/comments', { productId: product.Nume, content: newComment, rating: newRating,User: email });
      setNewComment('');
      setNewRating(0);
      fetchComments(); // Refetch comments after adding new one
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('Error adding comment. Please try again later.');
    }
  };

  return (
    <div className="product-page-container">
      <div className="product-details">
        <div className="product-image-container">
          <img src={imagePath} alt={product.Nume} className="product-image2" />
        </div>
        <div className="product-info">
          <h1 className="product-name2">{product.Nume}</h1>
          <p className="product-description">Marime:</p>
          <select name="size" value={newOrder.size} onChange={handleChange} className="size-select">
            <option value="">Selectează mărimea</option>
            {product.Marime.split('/').map((size, index) => (
              <option key={index} value={size.trim()}>
                {size.trim()}
              </option>
            ))}
          </select>
          <p className="product-price">Cantitate Maxima:{product.Cantitate}</p>
          <input
            type="number"
            min="0"
            value={newOrder.quantity}
            onChange={handleChange}
            name="quantity"
            className="quantity-input"
          />
          <button type="submit" onClick={handleSubmit} className="add-to-cart-button">
            Add to Cart
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      

      <div className="comments-section">
        <h2>Adaugă un comentariu!</h2>
       
        <form onSubmit={handleCommentSubmit}>
          <textarea value={newComment} onChange={handleCommentChange} placeholder="Add a comment"></textarea>
          <StarRating rating={newRating} onChange={handleRatingChange} />
          <button type="submit">Post Comment</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <section>
  <h2>Comentarii:</h2>
  <ul>
    {comments.map((comment, index) => (
      <li key={index}>
        <div class="comment">
          <StarRating rating={comment.rating} />
          <p class="comment-content">{comment.content}</p>
          <p class="comment-user">{comment.User}</p>
        </div>
      </li>
    ))}
  </ul>
</section>

      </div>
      
    </div>
    </div>
  );
};

export default ProductPage;
