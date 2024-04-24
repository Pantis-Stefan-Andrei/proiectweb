import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Bar, Chart}  from 'react-chartjs-2';

import 'chart.js/auto'; 
import './ProductsManagement'

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [newProduct, setNewProduct] = useState({
    Nume: '',
    Cantitate: 0,
    Marime: '',
    Gen: '',
    Path: '',
    NouaColoana: ''
  });

  const productChartRef = useRef(null);
  const userChartRef = useRef(null);

  useEffect(() => {
    axios.get('https://server-9ib4.onrender.com/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea produselor:', error);
      });

    axios.get('https://server-9ib4.onrender.com/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea utilizatorilor:', error);
      });

    // Cleanup function to destroy charts
    return () => {
      if (productChartRef.current && productChartRef.current.chartInstance) {
        productChartRef.current.chartInstance.destroy();
      }
      if (userChartRef.current && userChartRef.current.chartInstance) {
        userChartRef.current.chartInstance.destroy();
      }

    };
  }, []);

 

  const productChartData = {
    labels: products.map(product => product.Nume),
    datasets: [{
      label: 'Cantitate',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(0,0,0,1)',
      data: products.map(product => product.Cantitate)
    }]
  };

  const userChartData = {
    labels: ['Anul 1', 'Anul 2', 'Anul 3', 'Anul 4', 'Master', 'Doctorat'],
    datasets: [{
      label: 'Număr Utilizatori',
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(0,0,0,1)',
      data: [
        users.filter(user => user.anstudiu === 1).length,
        users.filter(user => user.anstudiu === 2).length,
        users.filter(user => user.anstudiu === 3).length,
        users.filter(user => user.anstudiu === 4).length,
        users.filter(user => user.anstudiu === 'Master').length,
        users.filter(user => user.anstudiu === 'Doctorat').length
      ]
    }]
  };

 
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header and other content */}
      
      <h2 style={{ marginBottom: '20px' }}>Grafic Cantitate Resurse Materiale</h2>
      <div style={{ marginBottom: '20px' }}>
        <Bar
          data={productChartData}
          options={{
            title: {
              display: true,
              text: 'Cantitate Resurse Materiale',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Bar
          data={userChartData}
          options={{
            title: {
              display: true,
              text: 'Cantitate Resurse Materiale',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    
    
    </div>
  );
};


export default Dashboard;
