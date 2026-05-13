export default function DemographicSection({ formData, handleInputChange, handleCheckboxChange }) {
  return (
    <section className="demographic-section">
      <h2>SOCIO-ECONOMIC & DEMOGRAPHIC DATA</h2>
      
      {/* Q1 */}
      <div className="form-group">
        <label>1. How old are you? </label>
        <input 
          type="number" 
          name="age" 
          value={formData.age}
          onChange={handleInputChange}
        />
      </div>

      {/* Q2 */}
      <div className="form-group">
        <label>2. Whom do you stay with?</label>
        <div className="radio-group">
          {['Father and mother', 'Mother only', 'Father only', 'Relative/Guardian'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={option} 
                name="stayWith" 
                value={option}
                checked={formData.stayWith === option}
                onChange={handleInputChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Q3 */}
      <div className="form-group">
        <label>3. What is the occupation of the guardian you stay with?</label>
        <div className="radio-group">
          {['Farm worker', 'Self employed', 'Employed by someone', 'Professional'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`occupation-${option}`} 
                name="guardianOccupation" 
                value={option}
                checked={formData.guardianOccupation === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`occupation-${option}`}>{option}</label>
            </div>
          ))}
        </div>
        <div className="form-group nested">
          <label>Other (please specify): </label>
          <input 
            type="text" 
            name="guardianOccupationOther" 
            value={formData.guardianOccupationOther}
            onChange={handleInputChange}
            placeholder="Please specify if other"
          />
        </div>
      </div>

      {/* Q5 */}
      <div className="form-group">
        <label>5. What is the academic level of your guardian (father/relative)?</label>
        <div className="radio-group">
          {['None', 'Primary', 'Secondary', 'Tertiary education'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`education-${option}`} 
                name="guardianEducation" 
                value={option}
                checked={formData.guardianEducation === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`education-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Q6 */}
      <div className="form-group">
        <label>6. What is your religion?</label>
        <div className="radio-group">
          {['Catholic', 'Protestant', 'Muslim', 'SDA', 'None'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`religion-${option}`} 
                name="religion" 
                value={option}
                checked={formData.religion === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`religion-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Q8 */}
      <div className="form-group">
        <label>8. How many are you in the family? </label>
        <input 
          type="number" 
          name="familySize" 
          value={formData.familySize}
          onChange={handleInputChange}
        />
      </div>

      {/* Q9 */}
      <div className="form-group">
        <label>9. Do you have older brothers and sisters?</label>
        <div className="radio-group">
          {['Yes', 'No'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`siblings-${option}`} 
                name="olderSiblings" 
                value={option}
                checked={formData.olderSiblings === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`siblings-${option}`}>{option}</label>
            </div>
          ))}
        </div>
        
        {formData.olderSiblings === 'Yes' && (
          <div className="form-group nested">
            <label>(b) If yes, do they have girlfriends/boyfriends?</label>
            <div className="radio-group">
              {['Yes', 'No'].map(option => (
                <div key={option} className="radio-option">
                  <input 
                    type="radio" 
                    id={`siblingsPartnered-${option}`} 
                    name="siblingsPartnered" 
                    value={option}
                    checked={formData.siblingsPartnered === option}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`siblingsPartnered-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Q10 */}
      <div className="form-group">
        <label>10. Do your parents give you pocket money?</label>
        <div className="radio-group">
          {['Yes', 'No'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`pocketmoney-${option}`} 
                name="parentsPocketMoney" 
                value={option}
                checked={formData.parentsPocketMoney === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`pocketmoney-${option}`}>{option}</label>
            </div>
          ))}
        </div>
        
        {formData.parentsPocketMoney === 'Yes' && (
          <div className="form-group nested">
            <label>(b) If yes, is it adequate?</label>
            <div className="radio-group">
              {['Yes', 'No'].map(option => (
                <div key={option} className="radio-option">
                  <input 
                    type="radio" 
                    id={`pocketmoneyAdequate-${option}`} 
                    name="pocketMoneyAdequate" 
                    value={option}
                    checked={formData.pocketMoneyAdequate === option}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`pocketmoneyAdequate-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Q11 */}
      <div className="form-group">
        <label>11. Who else meets your financial needs? (Select all that apply)</label>
        <div className="checkbox-group">
          {['Relatives', 'Boyfriend', 'Grandparents', 'Other friends'].map(option => (
            <div key={option} className="checkbox-option">
              <input 
                type="checkbox" 
                id={`financial-${option}`}
                checked={formData.financialNeeds[option] || false}
                onChange={() => handleCheckboxChange('financialNeeds', option)}
              />
              <label htmlFor={`financial-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Q12 */}
      <div className="form-group">
        <label>12. Does your guardian always visit you during the visiting days? (Only those in boarding school)</label>
        <div className="radio-group">
          {['Yes', 'No'].map(option => (
            <div key={option} className="radio-option">
              <input 
                type="radio" 
                id={`guardianvisits-${option}`} 
                name="guardianVisits" 
                value={option}
                checked={formData.guardianVisits === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`guardianvisits-${option}`}>{option}</label>
            </div>
          ))}
        </div>

        {formData.guardianVisits === 'No' && (
          <div className="form-group nested">
            <label>13. If no, who else visits you in school? (Select all that apply)</label>
            <div className="checkbox-group">
              {['Boyfriend', 'Relatives', 'Brothers/Sisters', 'Man friend (casual boyfriend)', 'None'].map(option => (
                <div key={option} className="checkbox-option">
                  <input 
                    type="checkbox" 
                    id={`visitors-${option}`}
                    checked={formData.otherVisitors[option] || false}
                    onChange={() => handleCheckboxChange('otherVisitors', option)}
                  />
                  <label htmlFor={`visitors-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
