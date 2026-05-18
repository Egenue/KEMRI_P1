import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ admin, onLogout }) {
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/questionnaires`.replace(/\/+$/, '')
    : 'https://kemri-p1.onrender.com/api/questionnaires';

  // Authentication check - verify token exists
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken' && !e.newValue) {
        navigate('/admin', { replace: true });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }, []);

  const getRecordId = (item) => {
    return item?.questionnairesno || item?.Questionnairesno || '';
  };

  const fetchQuestionnaires = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}?limit=100`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch questionnaires (${response.status})`);
      }

      const responsePayload = await response.json();
      
      // Pull array data cleanly out of your "data" key wrapper safely
      const questionnairesArray = responsePayload.success && Array.isArray(responsePayload.data) 
        ? responsePayload.data 
        : Array.isArray(responsePayload) ? responsePayload : [];

      setQuestionnaires(questionnairesArray);
      setTotalRecords(questionnairesArray.length);

      // Auto-select the first structural record if nothing is open yet
      if (questionnairesArray.length > 0 && !selectedItem) {
        setSelectedItem(questionnairesArray[0]);
      }

    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [API_URL, getAuthHeaders, selectedItem]);

  useEffect(() => {
    fetchQuestionnaires();
  }, [fetchQuestionnaires]);

  const formatPresentationValue = (value) => {
    if (value === null || value === undefined) return 'No';
    if (value === '' || value === null || value === undefined) return 'N/A';
    if (value === 1 || value === '1' || value === true || String(value).toLowerCase() === 'true') return 'Yes';
    if (value === 0 || value === '0' || value === false || String(value).toLowerCase() === 'false') return 'No';
    return String(value);
  };

  const convertToCSV = (data) => {
    const dataArray = Array.isArray(data) ? data : [data];
    if (dataArray.length === 0) return '';
    const keys = [...new Set(dataArray.flatMap(Object.keys))];
    const header = keys.join(',');
    const rows = dataArray.map(item =>
      keys.map(key => {
        let val = formatPresentationValue(item[key]).replace(/"/g, '""');
        return val.includes(',') || val.includes('\n') ? `"${val}"` : val;
      }).join(',')
    );
    return [header, ...rows].join('\n');
  };

  const handleDownloadCSV = (type = 'all') => {
    const targets = type === 'selected' ? [selectedItem] : questionnaires;
    const csv = convertToCSV(targets);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `records-${type}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm(`Are you sure you want to delete form instance #${id}?`)) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error(`Server execution error code: ${response.status}`);
      
      const updated = questionnaires.filter(q => getRecordId(q) !== id);
      setQuestionnaires(updated);
      setSelectedItem(updated[0] || null);
      setTotalRecords(updated.length);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSecureLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.clear();
    
    if (typeof onLogout === 'function') {
      onLogout();
    }
    
    navigate('/admin', { replace: true });
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-branding">
            <h1>KEMRI Admin Dashboard</h1>
            <p>Manage Questionnaires and Data</p>
          </div>
          <div className="admin-user-info">
            <span>Welcome, <strong>{admin?.username || 'Admin'}</strong></span>
            <button onClick={handleSecureLogout} className="logout-btn" title="Logout and clear session">Logout</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-stats">
          <div className="stat-card total-only">
            <div className="stat-number">{totalRecords}</div>
            <div className="stat-label">Total Active Questionnaires</div>
          </div>
        </section>

        {error && <div className="admin-error-message">{error}</div>}

        <div className="admin-content">
          <section className="admin-list-section">
            <div className="section-header">
              <h2>RESPONSES FEED</h2>
              <div className="header-actions">
                <button onClick={fetchQuestionnaires} className="refresh-btn">🔄 Refresh Feed</button>
                <button onClick={() => handleDownloadCSV('all')} className="download-btn">📥 Download CSV</button>
              </div>
            </div>

            <div className="questionnaire-list">
              {questionnaires.map((q) => {
                const idValue = getRecordId(q);
                const isSelected = selectedItem && getRecordId(selectedItem) === idValue;
                return (
                  <div 
                    key={idValue} 
                    className={`questionnaire-item ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedItem(q)}
                  >
                    <div className="item-header">
                      <span className="item-id">ID: #{idValue}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Origin School:</span>
                      <span className="value">{q.Schoolname || q.schoolname || 'N/A'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="admin-detail-section">
            {selectedItem ? (
              <div className="detail-view">
                <div className="detail-header">
                  <h3>Review Document</h3>
                  <button onClick={() => handleDelete(getRecordId(selectedItem))} className="delete-btn">
                    🗑️ Delete Record
                  </button>
                </div>

                <table className="presentation-meta-table">
                  <tbody>
                    <tr>
                      <td className="label">Document ID</td>
                      <td className="value geo-monospace">{getRecordId(selectedItem)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="detail-divider"></div>
                <div className="detail-section-title">Submitted Form Data</div>

                <div className="form-data-grid">
                  {Object.entries(selectedItem).map(([key, value]) => {
                    const displayVal = formatPresentationValue(value);
                    const isBool = displayVal === 'Yes' || displayVal === 'No';
                    
                    // Humanize field labels (e.g., 'oldersiblings' -> 'Oldersiblings')
                    const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);

                    return (
                      <div key={key} className="data-field-row">
                        <span className="field-label">{formattedLabel}:</span>
                        <span className={`field-value ${isBool ? `bool-${displayVal.toLowerCase()}` : ''}`}>
                          {displayVal || <em className="empty-placeholder">Empty</em>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="no-selection">Select an entry row to load fields.</div>
            )}
          </section>
        </div>
      </main>
      <footer className="admin-footer">
        <p>&copy; © {new Date().getFullYear()} KEMRI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;