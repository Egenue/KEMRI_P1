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
                name="access_rh_info" 
                value={option}
                checked={formData.access_rh_info === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`healthaccess-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Q15 */}
      {formData.access_rh_info === 'Yes' && (
        <div className="form-group">
          <label>15. If yes, who mostly educates you on reproductive health issues? (Select all that apply)</label>
          <div className="checkbox-group">
            {['Teachers', 'Parents', 'Health worker', 'Friends', 'Radio/Magazines/TV'].map(option => (
              <div key={option} className="checkbox-option">
                <input 
                  type="checkbox" 
                  id={`sources-${option}`}
                  value={option}
                  checked={formData.rh_info_source[option] || false}
                  onChange={() => handleCheckboxChange('rh_info_source', option)}
                />
                <label htmlFor={`sources-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q16 */}
      {formData.access_rh_info === 'Yes' && (
        <div className="form-group">
          <label>16. Which topics do they normally cover? (Select all that apply)</label>
          <div className="checkbox-group">
            {['Sexuality', 'Abstinence', 'Condoms', 'STI/HIV', 'Relationships'].map(option => (
              <div key={option} className="checkbox-option">
                <input 
                  type="checkbox" 
                  id={`topics-${option}`}
                  value={option}
                  checked={formData.topics_covered[option] || false}
                  onChange={() => handleCheckboxChange('topics_covered', option)}
                />
                <label htmlFor={`topics-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q17 */}
      {formData.access_rh_info === 'Yes' && (
        <div className="form-group">
          <label>17. Is the information adequate?</label>
          <div className="radio-group">
            {['Yes', 'No'].map(option => (
              <div key={option} className="radio-option">
                <input 
                  type="radio" 
                  id={`infoadequate-${option}`} 
                  name="info_adequate" 
                  value={option}
                  checked={formData.info_adequate === option}
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
