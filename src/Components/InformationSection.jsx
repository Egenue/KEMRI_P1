export default function InformationSection({ formData, handleInputChange, handleCheckboxChange }) {
  return (
    <section className="information-section">
      <h2>SOURCES OF INFORMATION & SEXUAL BEHAVIOR</h2>

      {/* Q14 */}
      <div className="form-group">
        <label>14. Do you have any access to reproductive health information?</label>
        <div className="radio-group">
          {['Yes', 'No'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`healthaccess-${option}`} 
                name="reproductiveHealthAccess" 
                value={option}
                checked={formData.reproductiveHealthAccess === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`healthaccess-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Q15 */}
      {formData.reproductiveHealthAccess === 'Yes' && (
        <div className="form-group">
          <label>15. If yes, who mostly educates you on reproductive health issues? (Select all that apply)</label>
          <div className="checkbox-group">
            {['Teachers', 'Parents', 'Health worker', 'Friends', 'Radio/Magazines/TV'].map(option => (
              <div key={option} className="checkbox-option">
                <input 
                  type="checkbox" 
                  id={`sources-${option}`}
                  checked={formData.healthInfoSources[option] || false}
                  onChange={() => handleCheckboxChange('healthInfoSources', option)}
                />
                <label htmlFor={`sources-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q16 */}
      {formData.reproductiveHealthAccess === 'Yes' && (
        <div className="form-group">
          <label>16. Which topics do they normally cover? (Select all that apply)</label>
          <div className="checkbox-group">
            {['Sexuality', 'Abstinence', 'Condoms', 'STI/HIV', 'Relationships'].map(option => (
              <div key={option} className="checkbox-option">
                <input 
                  type="checkbox" 
                  id={`topics-${option}`}
                  checked={formData.topicsCovered[option] || false}
                  onChange={() => handleCheckboxChange('topicsCovered', option)}
                />
                <label htmlFor={`topics-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q17 */}
      {formData.reproductiveHealthAccess === 'Yes' && (
        <div className="form-group">
          <label>17. Is the information adequate?</label>
          <div className="radio-group">
            {['Yes', 'No'].map(option => (
              <div key={option} className="radio-option">
                <input 
                  type="radio" 
                  id={`infoadequate-${option}`} 
                  name="informationAdequate" 
                  value={option}
                  checked={formData.informationAdequate === option}
                  onChange={handleInputChange}
                />
                <label htmlFor={`infoadequate-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
