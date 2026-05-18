import { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ admin, onLogout }) {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  const defaultApiUrl = import.meta.env.DEV ? 'https://kemri-p1.onrender.com/api' : undefined ;
  const API_BASE_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, '');
  const API_URL = `${API_BASE_URL}/questionnaire`;

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const fetchQuestionnaires = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}`);
      if (!response.ok) throw new Error('Failed to fetch questionnaires');
      
      const data = await response.json();
      setQuestionnaires(data);
      
      // Calculate stats
      setStats({
        total: data.length,
        pending: data.filter(q => q.status === 'pending').length,
        completed: data.filter(q => q.status === 'completed').length,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this questionnaire?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      
      setQuestionnaires(questionnaires.filter(q => q._id !== id));
      setSelectedItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-branding">
            <h1>KEMRI Admin Dashboard</h1>
            <p>Manage Questionnaires and Data</p>
          </div>
          <div className="admin-user-info">
            <span>Welcome, <strong>{admin?.username}</strong></span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {/* Statistics Section */}
        <section className="admin-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Questionnaires</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </section>

        {/* Error Message */}
        {error && <div className="admin-error-message">{error}</div>}

        {/* Content Area */}
        <div className="admin-content">
          {/* List Section */}
          <section className="admin-list-section">
            <div className="section-header">
              <h2>Questionnaire Responses</h2>
              <button onClick={fetchQuestionnaires} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading questionnaires...</div>
            ) : questionnaires.length === 0 ? (
              <div className="empty-state">
                <p>No questionnaires found</p>
              </div>
            ) : (
              <div className="questionnaire-list">
                {questionnaires.map((q) => (
                  <div
                    key={q._id}
                    className={`questionnaire-item ${selectedItem?._id === q._id ? 'active' : ''}`}
                    onClick={() => setSelectedItem(q)}
                  >
                    <div className="item-header">
                      <span className="item-id">{q._id?.slice(-8)}</span>
                      <span className={`status-badge status-${q.status || 'pending'}`}>
                        {q.status || 'pending'}
                      </span>
                    </div>
                    <div className="item-info">
                      <div className="info-row">
                        <span className="label">Date:</span>
                        <span className="value">
                          {new Date(q.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {q.name && (
                        <div className="info-row">
                          <span className="label">Name:</span>
                          <span className="value">{q.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Detail Section */}
          <section className="admin-detail-section">
            {selectedItem ? (
              <div className="detail-view">
                <div className="detail-header">
                  <h3>Response Details</h3>
                  <button
                    onClick={() => handleDelete(selectedItem._id)}
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                </div>

                <div className="detail-content">
                  <div className="detail-row">
                    <span className="label">ID:</span>
                    <span className="value">{selectedItem._id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`status-badge status-${selectedItem.status || 'pending'}`}>
                      {selectedItem.status || 'pending'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Created:</span>
                    <span className="value">
                      {new Date(selectedItem.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {selectedItem.updatedAt && (
                    <div className="detail-row">
                      <span className="label">Last Updated:</span>
                      <span className="value">
                        {new Date(selectedItem.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="detail-divider"></div>

                  <div className="detail-section-title">Form Data</div>
                  <div className="form-data">
                    {Object.entries(selectedItem).map(([key, value]) => {
                      if (['_id', '__v', 'createdAt', 'updatedAt', 'status'].includes(key)) return null;
                      
                      return (
                        <div key={key} className="data-field">
                          <span className="field-label">{key}:</span>
                          <span className="field-value">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a questionnaire to view details</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
