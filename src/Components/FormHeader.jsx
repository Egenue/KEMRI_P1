export default function FormHeader({ formData, handleInputChange }) {
  return (
    <div className="form-header">
      <h1>QUESTIONNAIRE FOR THE GIRLS AGED BETWEEN 15-19 YEARS</h1>
      
      <div className="header-fields">
        <div className="form-group">
          <label>Questionnaire serial number: </label>
          <input 
            type="text" 
            name="serialNumber" 
            value={formData.serialNumber}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Name of the school: </label>
          <input 
            type="text" 
            name="schoolName" 
            value={formData.schoolName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Supervisor's name: </label>
          <input 
            type="text" 
            name="supervisorName" 
            value={formData.supervisorName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Date of data collection: </label>
          <input 
            type="date" 
            name="dateCollection" 
            value={formData.dateCollection}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
