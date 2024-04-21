

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsManagement'
const CategoriesManagement = () => {
  const [orders, setorders] = useState([]);
  const [selectedorderId, setSelectedorderId] = useState(null);
  const [neworder, setNeworder] = useState({

    productId: '',
    content: '',
    Shipment: '',
    rating: 0,
    User: ''
  });
  useEffect(() => {
    axios.get('https://sundbserver.azurewebsites.net/api/allcomments')
      .then(response => {
        setorders(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea produselor:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNeworder(prevorder => ({
      ...prevorder,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sundbserver.azurewebsites.net/api/comments', neworder);
      // Refetch orders after adding new order
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/allcomments');
      setorders(response.data);
      // Reset form
      setNeworder({
      
    productId: '',
    content: '',
    Shipment: '',
    rating: 0,
    User: ''
      });
    } catch (error) {
      console.error('Eroare la adăugarea produsului:', error);
    }
  };
  const handleDeleteorder = async (orderId) => {
    try {
      await axios.delete(`https://sundbserver.azurewebsites.net/api/comments/${orderId}`);
      // Refetch orders after deletion
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/allcomments');
      setorders(response.data);
      setSelectedorderId(null); // Deselect the order after deletion
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Ia să vedem ce nevoi au avut studenții!</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
    
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Nume Produs:</label>
          <input type="text" name="productId" value={neworder.productId} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Content:</label>
          <input type="text" name="content" value={neworder.content} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Rating :</label>
          <input type="number" name="rating" value={neworder.rating} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>User:</label>
          <input type="text" name="User" value={neworder.User} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Adăugare tranzactie</button>
      </form>


      <h2 style={{ marginBottom: '20px' }}>Gestionare</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume Produs</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Content</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>User</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th> {/* Coloană pentru butonul de ștergere */}
          </tr>
        </thead>
        <tbody>
        {orders.map(order => (
  <tr key={order._id} style={{ backgroundColor: selectedorderId === order._id ? '#ccc' : 'transparent' }} onClick={() => setSelectedorderId(order._id)}>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productId}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.content}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.rating}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.User}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={() => handleDeleteorder(order._id)}>Șterge</button></td> {/* Buton de ștergere */}
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
};



export default CategoriesManagement;



