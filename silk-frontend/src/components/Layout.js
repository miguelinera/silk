import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Link to="/login">
        <img src="/silk-logo.png" alt="Silk Company Logo" className="layout-logo" />
      </Link>
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
