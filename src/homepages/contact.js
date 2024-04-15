import React, { useState } from 'react';
import axios from 'axios';
import './contact.css'
const ContactPage = () => {
  // Starea pentru a reține valorile introduse în formular
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    mesaj: ''
  });

  // Funcția pentru a gestiona modificările în formular
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funcția pentru a gestiona trimiterea formularului
  const handleSubmit = (e) => {
    e.preventDefault();

     axios.post('http://localhost:5000/api/problems',formData);
      
      
    
    setFormData({
      nume: '',
      email: '',
      mesaj: ''
    });
  };
 
  return (
    <div className="pagina-contact">
      <h2>Contactează-ne</h2>
      <div className="informatii-contact">
        <p>Pentru orice întrebări, te rugăm să contactezi:</p>
        <p>Liviu Soare</p>
        <p>Telefon: 0767421889</p>
        <p>Email: soareliviu@mta.ro</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grup-formular">
          <label htmlFor="nume">Nume:</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={formData.nume}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grup-formular">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grup-formular">
          <label htmlFor="mesaj">Mesaj:</label>
          <textarea
            id="mesaj"
            name="mesaj"
            value={formData.mesaj}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button  type="submit">Trimite</button>
      </form>
    </div>
  );
};

export default ContactPage;
