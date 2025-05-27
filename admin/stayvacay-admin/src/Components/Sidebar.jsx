import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const adminName = localStorage.getItem('adminName') || 'Admin';

  return (
    <div className="sidebar">
      <header>
        <h1>StayVacay Admin</h1>
        <h2>Welcome, {adminName}</h2>
      </header>
      <nav>
        <ul>
          <li><NavLink to="/dashboard/view-properties">View Properties</NavLink></li>
          <li><NavLink to="/dashboard/add-property">Add Properties</NavLink></li>
          <li><NavLink to="/dashboard/remove-property">Remove Properties</NavLink></li>
          <li><NavLink to="/dashboard/update-property">Update Properties</NavLink></li>
          <li><NavLink to="/dashboard/analytics">Analytics</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
