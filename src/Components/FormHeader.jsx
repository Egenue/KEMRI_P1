export default function FormHeader({ formData, handleInputChange }) {
  return (
    <div className="form-header">
      <h1>QUESTIONNAIRE FOR THE GIRLS AGED BETWEEN 15-19 YEARS</h1>
      
      <div className="header-fields">
        <div className="form-group">
          <label>Questionnaire serial number: </label>
          <input 
            type="text" 
            name="questionnaire_sno" 
            value={formData.questionnaire_sno}
            readOnly
            className="serial-number-input"
          />
          <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
            Auto-generated • Unique • Read-only
          </small>
        </div>
        
        <div className="form-group">
          <label>Name of the school: </label>
          <input 
            type="text" 
            name="school_name" 
            value={formData.school_name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Supervisor's name: </label>
          <input 
            type="text" 
            name="supervisor_fname" 
            value={formData.supervisor_fname}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Date of data collection: </label>
          <input 
            type="date" 
            name="collection_date" 
            value={formData.collection_date}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
