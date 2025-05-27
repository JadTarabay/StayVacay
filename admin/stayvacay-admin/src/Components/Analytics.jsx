import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const [popularProperties, setPopularProperties] = useState([]);
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    api.get('/analytics/popular-properties')
      .then(res => setPopularProperties(res.data))
      .catch(console.error);

    api.get('/analytics/traffic')
      .then(res => setTraffic(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="page-container">
      <h2>Analytics</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>Most Popular Properties</h3>
        {popularProperties.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <ul>
            {popularProperties.map(prop => (
              <li key={prop._id}>
                <strong>{prop.name}</strong> — {prop.views} views
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Website Traffic</h3>
        {traffic.length === 0 ? (
          <p>No traffic data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={traffic}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </div>
  );
};

export default Analytics;
