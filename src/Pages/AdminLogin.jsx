import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin({ onLoginSuccess }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {

      const response = await fetch(
        import.meta.env.DEV ? 'http://localhost:5000/adminLogon/login'
        : 'https://kemri-p1.vercel.app/adminLogon/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Login failed'
        );
      }

      // Save token
      localStorage.setItem(
        'adminToken',
        data.token
      );

      localStorage.setItem(
        'adminUser',
        JSON.stringify(data.admin)
      );

      // Optional callback
      if (onLoginSuccess) {
        onLoginSuccess(data.admin);
      }

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {

      setError(
        err.message || 'An error occurred'
      );

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

        {error && (
          <div className="admin-error-message">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >

          <div className="admin-form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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
            {loading
              ? 'Logging in...'
              : 'Login'}
          </button>

        </form>

        <div className="admin-login-footer">
          <p>
            © 2024 KEMRI.
            All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;