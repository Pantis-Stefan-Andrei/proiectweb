
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsManagement'
const DiscountsManagement = () => {
  const [problems, setproblems] = useState([]);
  const [selectedorderId, setSelectedorderId] = useState(null);

  useEffect(() => {
    axios.get('https://sundbserver.azurewebsites.net/api/problemsg')
      .then(response => {
        setproblems(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea produselor:', error);
      });
  }, []);


 
  const handleDeleteorder = async (orderId) => {
    try {
      await axios.delete(`https://sundbserver.azurewebsites.net/api/problems/${orderId}`);
      // Refetch problems after deletion
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/problems');
      setproblems(response.data);
      setSelectedorderId(null); // Deselect the order after deletion
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      

      <h2 style={{ marginBottom: '20px' }}>Gestionare</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stare</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th> {/* Coloană pentru butonul de ștergere */}
          </tr>
        </thead>
        <tbody>
          {problems.map(order => (
            <tr key={order._id} style={{ backgroundColor: selectedorderId === order._id ? '#ccc' : 'transparent' }} onClick={() => setSelectedorderId(order._id)}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.nume}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.mesaj}</td>         
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={() => handleDeleteorder(order._id)}>Șterge</button></td> {/* Buton de ștergere */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountsManagement;
