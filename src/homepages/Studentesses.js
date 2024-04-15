import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductPage from './ProductPage';
import './Students.css'; 

const ProductsListPage =  ({ email }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        // Filter products based on 'gen' property
        const filteredProducts = response.data.filter(product => {
          return product.Gen === 'Unisex' || product.Gen === 'Feminin';
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

  return (
    <div className="cont">
      {selectedProduct ? (
        <ProductPage product={selectedProduct} email={email} onClose={handleReset} />
      ) : (
        <div className="products">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map(product => (
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
      )}
    </div>
  );
};

export default ProductsListPage;
