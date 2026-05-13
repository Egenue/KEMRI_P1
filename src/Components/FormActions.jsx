export default function FormActions({ loading, message, messageType, handleSubmit, handleClear }) {
  return (
    <div className="form-actions">
      {message && (
        <div className={`form-message ${messageType}`}>
          {message}
        </div>
      )}
      <div className="button-group">
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={loading}
        >
          Clear All Fields
        </button>
        <button 
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Submitting...' : 'Submit Questionnaire'}
        </button>
      </div>
    </div>
  );
}
