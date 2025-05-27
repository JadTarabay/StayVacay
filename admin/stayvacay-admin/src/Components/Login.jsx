import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminName', res.data.admin.username);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Username" 
          value={username} onChange={e => setUsername(e.target.value)} required
        />
        <input 
          type="password" placeholder="Password" 
          value={password} onChange={e => setPassword(e.target.value)} required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
