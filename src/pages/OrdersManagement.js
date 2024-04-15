// OrdersManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersManagement = () => {
  const [orders, setorders] = useState([]);
  const [selectedorderId, setSelectedorderId] = useState(null);
  const [neworder, setNeworder] = useState({
    Nume: '',
    Cantitate: 0,
    Marime: '',
    Gen: '',
    Path: '',
    Stare: ''
  });
  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
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
      await axios.post('http://localhost:5000/api/orders', neworder);
      // Refetch orders after adding new order
      const response = await axios.get('http://localhost:5000/api/orders');
      setorders(response.data);
      // Reset form
      setNeworder({
        Nume: '',
        Cantitate: 0,
        Marime: '',
        Gen: '',
        Path: '',
        Stare: ''
      });
    } catch (error) {
      console.error('Eroare la adăugarea produsului:', error);
    }
  };
  const handleDeleteorder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      // Refetch orders after deletion
      const response = await axios.get('http://localhost:5000/api/orders');
      setorders(response.data);
      setSelectedorderId(null); // Deselect the order after deletion
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Ia să vedem ce nevoi mai au studenții!</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>OrderName</label>
          <input type="text" name="Nume" value={neworder.Nume} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Cantitate:</label>
          <input type="number" name="Cantitate" value={neworder.Cantitate} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Marime:</label>
          <input type="text" name="Marime" value={neworder.Marime} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Gen:</label>
          <input type="text" name="Gen" value={neworder.Gen} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Path imagine :</label>
          <input type="text" name="Path" value={neworder.Path} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Stare:</label>
          <input type="text" name="Stare" value={neworder.Stare} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Adăugare tranzactie</button>
      </form>


      <h2 style={{ marginBottom: '20px' }}>Gestionare</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cantitate</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marime</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>gen</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Path</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stare</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th> {/* Coloană pentru butonul de ștergere */}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} style={{ backgroundColor: selectedorderId === order._id ? '#ccc' : 'transparent' }} onClick={() => setSelectedorderId(order._id)}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Nume}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Cantitate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Marime}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Gen}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Path}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Stare}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={() => handleDeleteorder(order._id)}>Șterge</button></td> {/* Buton de ștergere */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagement;
