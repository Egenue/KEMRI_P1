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
          min={15}
          max={19}
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
                name="stay_with" 
                value={option}
                checked={formData.stay_with === option}
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
                name="guardian_occupation" 
                value={option}
                checked={formData.guardian_occupation === option}
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
            name="guardian_occupation_other" 
            value={formData.guardian_occupation_other || ''}
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
                name="guardian_education" 
                value={option}
                checked={formData.guardian_education === option}
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
          name="family_size" 
          value={formData.family_size}
          onChange={handleInputChange}
          min={1}
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
                name="older_siblings" 
                value={option}
                checked={formData.older_siblings === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`siblings-${option}`}>{option}</label>
            </div>
          ))}
        </div>
        
        {formData.older_siblings === 'Yes' && (
          <div className="form-group nested">
            <label>(b) If yes, do they have girlfriends/boyfriends?</label>
            <div className="radio-group">
              {['Yes', 'No'].map(option => (
                <div key={option} className="radio-option">
                  <input 
                    type="radio" 
                    id={`siblingsPartnered-${option}`} 
                    name="siblings_have_relationships" 
                    value={option}
                    checked={formData.siblings_have_relationships === option}
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
                name="pocket_money" 
                value={option}
                checked={formData.pocket_money === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`pocketmoney-${option}`}>{option}</label>
            </div>
          ))}
        </div>
        
        {formData.pocket_money === 'Yes' && (
          <div className="form-group nested">
            <label>(b) If yes, is it adequate?</label>
            <div className="radio-group">
              {['Yes', 'No'].map(option => (
                <div key={option} className="radio-option">
                  <input 
                    type="radio" 
                    id={`pocketmoneyAdequate-${option}`} 
                    name="pocket_money_adequate" 
                    value={option}
                    checked={formData.pocket_money_adequate === option}
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
                value = {option || ''}
                checked={formData.financial_support[option]}
                onChange={() => handleCheckboxChange('financial_support', option)}
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
                name="guardian_visits" 
                value={option}
                checked={formData.guardian_visits === option}
                onChange={handleInputChange}
              />
              <label htmlFor={`guardianvisits-${option}`}>{option}</label>
            </div>
          ))}
        </div>

        {formData.guardian_visits === 'No' && (
          <div className="form-group nested">
            <label>13. If no, who else visits you in school? (Select all that apply)</label>
            <div className="checkbox-group">
              {['Boyfriend', 'Relatives', 'Brothers/Sisters', 'Man friend (casual boyfriend)', 'None'].map(option => (
                <div key={option} className="checkbox-option">
                  <input 
                    type="checkbox" 
                    id={`visitors-${option}`}
                    value={option || ''}
                    checked={formData.other_visitors[option]}
                    onChange={() => handleCheckboxChange('other_visitors', option)}
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
