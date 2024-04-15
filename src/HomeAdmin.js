
import React, { useState,useEffect } from 'react';
import './HomeAdmin.css';
import IMGLIV from './image/liviu.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = ({}) => {
  const [selectedPage, setSelectedPage] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [username, setUsername] = useState('');
  
  const [email, setEmail] = useState('');
  const [account_type, setAccountType] = useState('');
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log(storedUser);
      setUsername(storedUser.username); // Change to setUsername
      setEmail(storedUser.email); // Change to setEmail
      setAccountType(storedUser.accountType); // Change to setAccountType
   
    }
  }, []);

  const handlePageChange = (pageName) => {
    setSelectedPage(pageName);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

   
  
navigate('/');
  };
  function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var bars = document.querySelectorAll('.toggle-button .bar');
    sidebar.classList.toggle('sidebar-closed');
    bars.forEach(function(bar) {
      bar.classList.toggle('bar-open');
    });
  }

  // Import pages dynamically
  const PageComponent = React.lazy(() => import(`./pages/${selectedPage}`));

  return (
    <div className={`home-admin-container ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <img className="profile-picture" src={IMGLIV} alt="Profile" />
          <h2>
            <span>Admin Panel</span>
            <span>{email}</span> {/* Adaugăm numele utilizatorului */}
          </h2>
          </div>
        <ul>
        <li className={selectedPage === 'Dashboard' ? 'activ' : ''} onClick={() => handlePageChange('Dashboard')}>Pagină principală</li>
<li className={selectedPage === 'ProductsManagement' ? 'activ' : ''} onClick={() => handlePageChange('ProductsManagement')}>Gestionare echipament</li>
<li className={selectedPage === 'OrdersManagement' ? 'activ' : ''} onClick={() => handlePageChange('OrdersManagement')}>Gestionare comenzi</li>
<li className={selectedPage === 'CustomersManagement' ? 'activ' : ''} onClick={() => handlePageChange('CustomersManagement')}>Gestionare studenți</li>
<li className={selectedPage === 'CategoriesManagement' ? 'activ' : ''} onClick={() => handlePageChange('CategoriesManagement')}>Gestionare comentarii</li>
<li className={selectedPage === 'DiscountsManagement' ? 'activ' : ''} onClick={() => handlePageChange('DiscountsManagement')}>Gestionare probleme</li>
<li className={selectedPage === 'ReportsAnalytics' ? 'activ' : ''} onClick={() => handlePageChange('ReportsAnalytics')}>Rapoarte și analize</li>
<li className={selectedPage === 'Settings' ? 'activ' : ''} onClick={() => handlePageChange('Settings')}>Setări</li>
<li className={selectedPage === 'StaffManagement' ? 'activ' : ''} onClick={() => handlePageChange('StaffManagement')}>Gestionare personal</li>
<li className={selectedPage === 'Logout' ? 'activ' : ''} onClick={() => handleLogout()}>Delogare <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> </li>

        </ul>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <button className="toggle-button" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        {/* Render selected page based on state */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <PageComponent />
        </React.Suspense>
      </div>
    </div>
  );
};

export default HomeAdmin;
