import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; 
import ProductPage from './ProductPage';
import './Students.css'; 

const ProductsListPage = ({ email })  => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [query, setQuery] = useState('');


  useEffect(() => {
    axios.get('https://sundbserver.azurewebsites.net/api/products')
      .then(response => {
        // Filter products based on 'gen' property
        const filteredProducts = response.data.filter(product => {
          return product.Gen === 'Unisex' || product.Gen === 'Masculin';
        });
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleReset = () => {
    setSelectedProduct(null);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.Nume.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div className="cont">
      {selectedProduct ? (
        <ProductPage product={selectedProduct} email={email} onClose={handleReset} />
      ) : (
        <div className='product-display'>
        <div className='search-container'>
        <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleInputChange}
          />
          </div>
          <div className="products">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredProducts.map(product => (
              <div
                className="product"
                key={product.id}
                onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <img src={product.Path} alt={product.Nume} className="product-image" />
                <div className="product-details">
                  <h2 className="product-name">{product.Nume}</h2>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      )}
    </div>
  );


};
export default ProductsListPage;
