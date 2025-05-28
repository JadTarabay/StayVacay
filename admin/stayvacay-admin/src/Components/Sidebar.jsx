import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './CSS/Sidebar.css';
import { toast } from 'react-toastify';


const Sidebar = () => {
  const adminName = localStorage.getItem('adminName') || 'Admin';

  
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.clear();
  toast.success('Logged out successfully!');
  navigate('/admin-login');
};

  return (
    <div className="sidebar">
      <header>
        <h1>StayVacay Admin</h1>
        <h2>Welcome, <span>{adminName}</span></h2>
      </header>
      <nav className='sidebar-nav'>
        <ul>
          <li><NavLink to="/dashboard/view-properties">View Properties</NavLink></li>
          <li><NavLink to="/dashboard/add-property">Add Properties</NavLink></li>
          <li><NavLink to="/dashboard/remove-property">Remove Properties</NavLink></li>
          <li><NavLink to="/dashboard/update-property">Update Properties</NavLink></li>
          <li><NavLink to="/dashboard/analytics">Analytics</NavLink></li>
        </ul>
      </nav>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
