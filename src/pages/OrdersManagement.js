// OrdersManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsManagement'
const OrdersManagement = () => {
  const [orders, setorders] = useState([]);
  const [selectedorderId, setSelectedorderId] = useState(null);
  const [neworder, setNeworder] = useState({
    Nume: '',
    Cantitate: 0,
    Marime: '',
    Gen: '',
    Path: '',
    Stare: '',
    NumeP: ''
  });
  useEffect(() => {
    axios.get('https://server-9ib4.onrender.com/api/orders')
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
      await axios.post('https://server-9ib4.onrender.com/api/orders', neworder);
      // Refetch orders after adding new order
      const response = await axios.get('https://server-9ib4.onrender.com/api/orders');
      setorders(response.data);
      // Reset form
      setNeworder({
        Nume: '',
        Cantitate: 0,
        Marime: '',
        Gen: '',
        Path: '',
        Stare: '',
        NumeP: ''
      });
    } catch (error) {
      console.error('Eroare la adăugarea produsului:', error);
    }
  };
  
  const handleresolve = async (orderId) => {
    try { 

      const responseprod = await axios.get('https://server-9ib4.onrender.com/api/products');
 
     

      let order2; 
for (const order of orders) {
    if (order._id === orderId) {
        order2 = order; 
        break; 
    }
}
let prod2;
for (const prod of responseprod.data) {
  if (prod.Nume === order2.Nume) {
    prod2 = prod; 
      break; 
  }
}

let ok=0;
const prod0=prod2;

await axios.delete(`https://server-9ib4.onrender.com/api/products/${prod0._id}`);
if(prod2.Cantitate-order2.Cantitate>0)
{prod2.Cantitate=prod2.Cantitate-order2.Cantitate;
  ok=1
}
await axios.post('https://server-9ib4.onrender.com/api/products', prod2);


      await axios.delete(`https://server-9ib4.onrender.com/api/orders/${orderId}`);
      if(ok===1)
      order2.Stare = 'finalizata';
     // console.log(order2);
      await axios.post('https://server-9ib4.onrender.com/api/orders', order2);
      const response = await axios.get('https://server-9ib4.onrender.com/api/orders');
      setorders(response.data);
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };
  const handleDeleteorder = async (orderId) => {
    try {
      await axios.delete(`https://server-9ib4.onrender.com/api/orders/${orderId}`);
      // Refetch orders after deletion
      const response = await axios.get('https://server-9ib4.onrender.com/api/orders');
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Destinatar:</label>
          <input type="text" name="NumeP" value={neworder.NumeP} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Adăugare tranzactie</button>
      </form>


      <h2 style={{ marginBottom: '20px' }}>Gestionare elemente nefinalizate</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cantitate</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marime</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>gen</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Path</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stare</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Destinatar</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th> {/* Coloană pentru butonul de ștergere */}
          </tr>
        </thead>
        <tbody>
  {orders.map(order => (
    order.Stare !== 'finalizata' && (
      <tr key={order._id} style={{ backgroundColor: selectedorderId === order._id ? '#ccc' : 'transparent' }} onClick={() => setSelectedorderId(order._id)}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Nume}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Cantitate}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Marime}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Gen}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Path}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Stare}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.NumeP}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
          <button onClick={() => handleresolve(order._id)}>Procesare</button>
          <button onClick={() => handleDeleteorder(order._id)}>Șterge</button> {/* Buton de ștergere */}
        </td>
      </tr>
    )
  ))}
</tbody>

      </table>
      
      <h2 style={{ marginBottom: '20px' }}>Gestionare elemente finalizate</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cantitate</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marime</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>gen</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Path</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stare</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Destinatar</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th> {/* Coloană pentru butonul de ștergere */}
          </tr>
        </thead>
        <tbody>
  {orders.map(order => (
    order.Stare === 'finalizata' && (
      <tr key={order._id} style={{ backgroundColor: selectedorderId === order._id ? '#ccc' : 'transparent' }} onClick={() => setSelectedorderId(order._id)}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Nume}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Cantitate}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Marime}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Gen}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Path}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.Stare}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.NumeP}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
          
          <button onClick={() => handleDeleteorder(order._id)}>Șterge</button> {/* Buton de ștergere */}
        </td>
      </tr>
    )
  ))}
</tbody>

      </table>
    </div>
  );
};

  
export default OrdersManagement;
