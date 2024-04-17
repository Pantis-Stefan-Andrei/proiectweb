
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Bar, Chart}  from 'react-chartjs-2';

import 'chart.js/auto'; 


const ReportsAnalytics = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://sundbserver.azurewebsites.net/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea produselor:', error);
      });

    axios.get('https://sundbserver.azurewebsites.net/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea utilizatorilor:', error);
      });

    axios.get('https://sundbserver.azurewebsites.net/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea comenzilor:', error);
      });
  }, []);

  // Calculăm numărul total de produse
  const totalProducts = products.length;

  // Calculăm costul mediu al comenzilor
  const averageOrderCost = orders.length > 0 ? orders.reduce((acc, order) => acc + order.Cantitate, 0) / orders.length : 0;

  // Identificăm cea mai frecventă stare a comenzilor
  const getOrderStatusAnalytics = () => {
    if (orders.length === 0) return '';

    const statusCounts = {};
    orders.forEach(order => {
      statusCounts[order.Stare] = (statusCounts[order.Stare] || 0) + 1;
    });

    const mostFrequentStatus = Object.keys(statusCounts).reduce((a, b) => statusCounts[a] > statusCounts[b] ? a : b);
    return mostFrequentStatus;
  };

  
  const productChartData = {
    labels: ['Total Echipamente'],
    datasets: [{
      label: 'Număr Echipamente',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(0,0,0,1)',
      data: [totalProducts]
    }]
  };

  
  const orderCostChartData = {
    labels: ['Cantitate Medie Comenzi'],
    datasets: [{
      label: 'Cantitate Medie',
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(0,0,0,1)',
      data: [averageOrderCost.toFixed(2)]
    }]
  };


  const mostFrequentOrderStatus = getOrderStatusAnalytics();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Analitici</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Număr total de echipamente: {totalProducts}</h3>
        <Bar
          data={productChartData}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Media cantitatilor: {averageOrderCost.toFixed(2)}</h3>
        <Bar
          data={orderCostChartData}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Cea mai frecventă stare a comenzilor: {mostFrequentOrderStatus}</h3>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
