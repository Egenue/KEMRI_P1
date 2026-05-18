import { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://kemri-p1.vercel.app/api/adminLogon/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      
      // Call the success callback
      onLoginSuccess(data.admin);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>KEMRI Admin Portal</h1>
          <p>Secure Admin Access</p>
        </div>

        {error && <div className="admin-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>© 2024 KEMRI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
