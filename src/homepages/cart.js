import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';

const Cart = ({ email }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newOrder, setNewOrder] = useState({
    Nume: '',
    Cantitate: 0,
    Marime: '',
    Gen: '',
    Path: '',
    Stare: '',
    NumeP:''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');
      const filteredOrders = response.data.filter(order =>(order.Stare ===('creare'))&&order.NumeP===email);
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleBuyAll = async () => {
    try {
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');

      const processingOrders = response.data.filter(order => (order.Stare ===('creare'))&&order.NumeP===email);
   
      // Assuming there might be multiple processing orders, updating each one
      for (const order of processingOrders) {
        const order2=order;
        await axios.delete(`https://sundbserver.azurewebsites.net/api/orders/${order._id}`);
        order2.Stare = 'Processing';
        console.log(order2);
        await axios.post('https://sundbserver.azurewebsites.net/api/orders', order2);
    
      }
      setOrders(processingOrders);
      console.log(processingOrders);
      // Refetch orders after updating state
      fetchOrders();
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  };
  const handleShowProcessingOrders = async () => {
    try {
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');
      const processingOrders = response.data.filter(order => (order.Stare ===('Processing'))&&order.NumeP===email);
      setOrders(processingOrders);
      console.log(processingOrders);
    } catch (error) {
      console.error('Error fetching processing orders:', error);
    }
  };
  const handleShowcart = async () => {
    try {
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');
      const processingOrders = response.data.filter(order =>(order.Stare ===('creare'))&&order.NumeP===email);
      setOrders(processingOrders);
      console.log(processingOrders);
    } catch (error) {
      console.error('Error fetching processing orders:', error);
    }
  };
  const handleHistory = async () => {
    try {
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');
      const processingOrders = response.data.filter(order =>(order.Stare ===('finalizata'))&&order.NumeP===email);
      setOrders(processingOrders);
      console.log(processingOrders);
    } catch (error) {
      console.error('Error fetching processing orders:', error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://sundbserver.azurewebsites.net/api/orders/${orderId}`);
      // Refetch orders after deletion
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');
      const filteredOrders = response.data.filter(order => order.NumeP === email);
      setOrders(filteredOrders);
      setSelectedOrderId(null); // Deselect the order after deletion
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };

  const handleUpdateQuantity = async (orderId, newQuantity) => {
    try {
      // Update quantity for the selected order
      await axios.put(`https://sundbserver.azurewebsites.net/api/orders/${orderId}`, { Cantitate: newQuantity });
      // Refetch orders after updating quantity
      const response = await axios.get('https://sundbserver.azurewebsites.net/api/orders');
      const filteredOrders = response.data.filter(order =>(order.Stare ===('creare'))&&order.NumeP===email);
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Eroare la actualizarea cantității:', error);
    }
  };

  const handleAddQuantity = (orderId) => {
    const orderToUpdate = orders.find(order => order._id === orderId);
    const newQuantity = orderToUpdate.Cantitate + 1;
    handleUpdateQuantity(orderId, newQuantity);
   
  };

  const handleSubtractQuantity = (orderId) => {
    const orderToUpdate = orders.find(order => order._id === orderId);
    const newQuantity = orderToUpdate.Cantitate - 1 >= 0 ? orderToUpdate.Cantitate - 1 : 0;
    handleUpdateQuantity(orderId, newQuantity);

  };
  return (
    <div className='bodyuser'>
      <h2 className='h2'  >Coș de cumpărături</h2>
      <button onClick={handleBuyAll}>Buy All</button>
      <button onClick={handleShowProcessingOrders}>Show Processing Orders</button>
      <button onClick={handleShowcart}>Show Cart</button>
      <button onClick={handleHistory}>Show History</button>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orders.map(order => (
          <li key={order._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={order.Path} alt={order.Nume} style={{ width: '100px', marginRight: '10px' }} />
              <div>
                <h3>{order.Nume}</h3>
                <p><strong>Cantitate:</strong> {order.Cantitate}</p>
                <p><strong>Mărime:</strong> {order.Marime}</p>
                <p><strong>Gen:</strong> {order.Gen}</p>
                <p><strong>Stare:</strong> {order.Stare}</p>
                {order.Stare === 'creare' && (
            <>
              <button onClick={() => handleAddQuantity(order._id)}>+</button>
              <button onClick={() => handleSubtractQuantity(order._id)}>-</button>
              <button onClick={() => handleDeleteOrder(order._id)}>Elimină</button>
            </>
          )}
            
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
