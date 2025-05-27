import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import ViewProperties from '../Components/ViewProperties';
import AddProperty from '../Components/AddProperty';
import RemoveProperty from '../Components/RemoveProperty';
import UpdateProperty from '../Components/UpdateProperty';
import Analytics from '../Components/Analytics';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="view-properties" replace />} />
          <Route path="view-properties" element={<ViewProperties />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="remove-property" element={<RemoveProperty />} />
          <Route path="update-property" element={<UpdateProperty />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="view-properties" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
