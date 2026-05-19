import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormActions({ loading, message, messageType, handleClear, isFirstStep, isSecondStep, isFinalStep }) {
  const navigate = useNavigate();

  return (
    <div className="form-actions">
      {message && (
        <div className={`form-message ${messageType}`}>
          {message}
        </div>
      )}
      <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', transition: 'background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease'}}>
        
        {/* Left Side: Clear or Back buttons */}
        <div>
          {isFirstStep ? (
            <button type="button" className="btn btn-secondary" onClick={handleClear} disabled={loading}>
              Clear All Fields
            </button>
          ) : isSecondStep ? (
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/workspace/form/header-info')}>
              Back to Header Info
            </button>
          ) : (
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/workspace/form/demographics')}>
              Back to Demographics
            </button>
          )}
        </div>

        {/* Right Side: Progressive Forward buttons */}
        <div>
          {isFirstStep ? (
            <button type="button" className="btn btn-primary" onClick={() => navigate('/workspace/form/demographics')}>
              Go to Demographics
            </button>
          ) : isSecondStep ? (
            <button type="button" className="btn btn-primary" onClick={() => navigate('/workspace/form/information')}>
              Go to Information Section
            </button>
          ) : (
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Questionnaire'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}