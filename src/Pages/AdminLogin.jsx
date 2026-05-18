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

    // Prevent double submissions if user bypasses button 'disabled' state
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/adminLogon/login` :
        'https://kemri-p1.onrender.com/adminLogon/login',
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

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Server returned an invalid response format.");
      }

      if (!response.ok) {
        throw new Error(
          data?.message || `Login failed with status: ${response.status}`
        );
      }

      // Ensure token exists before saving
      if (!data?.token) {
        throw new Error("Authentication token missing from server response.");
      }

      // Save token securely 
      localStorage.setItem('adminToken', data.token);

      // Guarded JSON stringify check
      if (data?.admin) {
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
      }

      // Optional callback
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(data.admin || null);
      }

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
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
          <div className="admin-error-message" role="alert">
            {error}
          </div>
        )}

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
              autoComplete="username"
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
              autoComplete="current-password"
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
          <p>
            © {new Date().getFullYear()} KEMRI. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;