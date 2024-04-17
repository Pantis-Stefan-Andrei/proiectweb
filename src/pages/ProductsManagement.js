import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsManagement.css'
const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    Nume: '',
    Cantitate: 0,
    Marime: '',
    Gen: '',
    Path: '',
    NouaColoana: '' // Adăugăm și noua coloană în starea componentei
  });
  useEffect(() => {
    axios.get('https://sundbserver.azurewebsites.net/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea produselor:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sundbserver.azurewebsites.net/api/products', newProduct);
      // Refetch products after adding new product
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/products');
      setProducts(response.data);
      // Reset form
      setNewProduct({
        Nume: '',
        Cantitate: 0,
        Marime: '',
        Gen: '',
        Path: ''
      
      });
    } catch (error) {
      console.error('Eroare la adăugarea produsului:', error);
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://sundbserver.azurewebsites.net/api/products/${productId}`);
      // Refetch products after deletion
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/products');
      setProducts(response.data);
      setSelectedProductId(null); // Deselect the product after deletion
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Haideți să examinăm ce resurse mai avem disponibile în unitate!</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Nume:</label>
          <input type="text" name="Nume" value={newProduct.Nume} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Cantitate:</label>
          <input type="number" name="Cantitate" value={newProduct.Cantitate} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Marime:</label>
          <input type="text" name="Marime" value={newProduct.Marime} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Gen:</label>
          <input type="text" name="Gen" value={newProduct.Gen} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Path (URL imagine):</label>
          <input type="text" name="Path" value={newProduct.Path} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
      
        <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Adăugare Produs</button>
      </form>


      <h2 style={{ marginBottom: '20px' }}>Gestionare</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cantitate</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marime</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gen</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Imagine</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th> {/* Coloană pentru butonul de ștergere */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} style={{ backgroundColor: selectedProductId === product._id ? '#ccc' : 'transparent' }} onClick={() => setSelectedProductId(product._id)}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.Nume}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.Cantitate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.Marime}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.Gen}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><img src={product.Path} alt={product.Nume} /></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={() => handleDeleteProduct(product._id)}>Șterge</button></td> {/* Buton de ștergere */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManagement;
