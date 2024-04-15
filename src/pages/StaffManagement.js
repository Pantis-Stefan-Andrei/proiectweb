
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffManagement = () => {
  const [users, setusers] = useState([]);
  const [selecteduserId, setSelecteduserId] = useState(null);
  const [newuser, setNewuser] = useState({
    email: '',
    password: '',
    account_type: '',
    username: ''
  });
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setusers(response.data);
      })
      .catch(error => {
        console.error('Eroare la preluarea produselor:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewuser(prevuser => ({
      ...prevuser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', newuser);
      if (response.data.account_type !== 'student') {
        // Refetch users after adding new user
        const updatedUsers = await axios.get('http://localhost:5000/api/users');
        setusers(updatedUsers.data);
        // Reset form
        setNewuser({
          email: '',
          password: '',
          account_type: '',
          username: ''
        });
      } else {
        console.log("Nu poți adăuga un student!");
      }
    } catch (error) {
      console.error('Eroare la adăugarea produsului:', error);
    }
  };

  const handleDeleteuser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      // Refetch users after deletion
      const response = await axios.get('http://localhost:5000/api/users');
      setusers(response.data);
      setSelecteduserId(null); // Deselect the user after deletion
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Ce să fac cu atâta personal?</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Email:</label>
          <input type="text" name="email" value={newuser.email} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Tipul de cont:</label>
          <input type="text" name="account_type" value={newuser.account_type} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Nume:</label>
          <input type="text" name="username" value={newuser.username} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', minWidth: '120px' }}>Parola:</label>
          <input type="text" name="password" value={newuser.password} onChange={handleChange} style={{ flex: 1, padding: '5px' }} />
        </div>
      
        <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Adăugare Persoanl</button>
      </form>


      <h2 style={{ marginBottom: '20px' }}>Gestionare</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tip Cont</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nume</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
  {users.filter(user => user.account_type !== 'student').map(user => (
    <tr key={user._id} style={{ backgroundColor: selecteduserId === user._id ? '#ccc' : 'transparent' }} onClick={() => setSelecteduserId(user._id)}>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.account_type}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.username}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={() => handleDeleteuser(user._id)}>Șterge</button></td> {/* Buton de ștergere */}
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default StaffManagement;
