import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductPage from './ProductPage';
import './Students.css'; 

const ProductsListPage = ({ email }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' sau 'quantity'
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    axios.get('https://sundbserver.azurewebsites.net/api/products')
      .then(response => {
        const filteredProducts = response.data.filter(product => {
          return product.Gen === 'Unisex' || product.Gen === 'Masculin';
        });
        setProducts(filteredProducts);
        setSortedProducts(filteredProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Sortare când se schimbă lista de produse sau modul de sortare
    sortProducts();
  }, [products, sortBy]);

  const sortProducts = () => {
    let sorted = [...products];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.Nume.localeCompare(b.Nume));
    } else if (sortBy === 'quantity') {
      sorted.sort((a, b) => a.Cantitate - b.Cantitate);
    }
    setSortedProducts(sorted);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleReset = () => {
    setSelectedProduct(null);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredProducts = sortedProducts.filter(product =>
    product.Nume.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cont">
      {selectedProduct ? (
        <ProductPage product={selectedProduct} email={email} onClose={handleReset} />
      ) : (
        <div className='product-display'>
          <div className='search-container'>
            <img className="search-icon" src="/search.png" alt="Search Icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleInputChange}
            />
          </div>
          <div className='sort-container'>
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange}>
              <option value="name">Nume</option>
              <option value="quantity">Cantitate</option>
            </select>
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
                    <p className="product-cant">Cantitate: {product.Cantitate}</p>
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
