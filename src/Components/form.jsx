import { useState } from 'react';
import Button from './UI/button';
import './form.css';



export default function Form() {
  const [formData, setFormData] = useState({
    serialNumber: '',
    schoolName: '',
    supervisorName: '',
    dateCollection: '',
    
    age: '',
    stayWith: '',
    guardianOccupation: '',
    guardianOccupationOther: '',
    guardianEducation: '',
    religion: '',
    familySize: '',
    olderSiblings: '',
    siblingsPartnered: '',
    parentsPocketMoney: '',
    pocketMoneyAdequate: '',
    financialNeeds: {},
    guardianVisits: '',
    otherVisitors: {},
    
    reproductiveHealthAccess: '',
    healthInfoSources: {},
    topicsCovered: {},
    informationAdequate: ''
  });

  const handleCheckboxChange = (section, option) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [option]: !prev[section][option]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="questionnaire-form">
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

      <div className="instructions-section">
        <h2>INSTRUCTIONS</h2>
        <ul>
          <li>Do not write your name</li>
          <li>Answer the questions asked individually by putting a tick on the box provided</li>
          <li>On completion put the questionnaire into the box provided</li>
        </ul>
      </div>

      <section className="demographic-section">
        <h2>SOCIO-ECONOMIC & DEMOGRAPHIC DATA</h2>
        
        <div className="form-group">
          <label>1. How old are you? </label>
          <input 
            type="number" 
            name="age" 
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>2. Whom do you stay with?</label>
          <div className="radio-group">
            {['Father and mother', 'Mother only', 'Father only', 'Relative'].map(option => (
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

        <div className="form-group">
          <label>8. How many are you in the family? </label>
          <input 
            type="number" 
            name="familySize" 
            value={formData.familySize}
            onChange={handleInputChange}
          />
        </div>

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

      {/* Sources of Information & Sexual Behavior Section */}
      <section className="information-section">
        <h2>SOURCES OF INFORMATION & SEXUAL BEHAVIOR</h2>

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

      {/* Submit Button */}
      <div className="form-actions">
        <Button type="submit">Submit Questionnaire</Button>
      </div>
    </form>
  );
}