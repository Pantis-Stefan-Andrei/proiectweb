import React, { useState } from 'react';

const AdminSettingsPage = () => {
  // Starea pentru a gestiona diversele opțiuni de setări
  const [shopName, setShopName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [theme, setTheme] = useState('light');

  // Funcții pentru a gestiona schimbările în setări
  const handleShopNameChange = (event) => {
    setShopName(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // Renderizarea componentei
  return (
    <div>
      <h2>Admin Settings</h2>
      <form>
        <label>
          Shop Name:
          <input
            type="text"
            value={shopName}
            onChange={handleShopNameChange}
          />
        </label>
        <br />
        <label>
          Currency:
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </label>
        <br />
        <label>
          Enable Notifications:
          <input
            type="checkbox"
            checked={notificationEnabled}
            onChange={handleNotificationToggle}
          />
        </label>
        <br />
        <label>
          Theme:
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
