import { useState } from 'react';
import FormHeader from '../Components/FormHeader';
import InstructionsSection from '../Components/InstructionsSection';
import DemographicSection from '../Components/DemographicSection';
import InformationSection from '../Components/InformationSection';
import FormActions from '../Components/FormActions';
import './form.css';

export default function Form() {
  const initialState = {
    serialNumber: '', schoolName: '', supervisorName: '', dateCollection: '',
    age: '', stayWith: '', guardianOccupation: '', guardianOccupationOther: '',
    guardianEducation: '', religion: '', ethnicity: '', familySize: '',
    olderSiblings: '', siblingsPartnered: '', parentsPocketMoney: '',
    pocketMoneyAdequate: '', financialNeeds: {}, guardianVisits: '',
    otherVisitors: {}, reproductiveHealthAccess: '', healthInfoSources: {},
    topicsCovered: {}, informationAdequate: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (section, option) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [option]: !prev[section][option]
      }
    }));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData(initialState);
      setMessage('✅ All fields cleared successfully');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.serialNumber || !formData.schoolName) {
      setMessage('⚠️ Please fill in at least Serial Number and School Name');
      setMessageType('warning');
      return;
    }

    setLoading(true);
    setMessage('');

    // Convert checkbox objects { item: true } into "item1, item2" strings for MySQL
    const stringifyCheckboxes = (obj) => 
      Object.keys(obj).filter(key => obj[key]).join(', ');

    const payload = {
      ...formData,
      financialNeeds: stringifyCheckboxes(formData.financialNeeds),
      otherVisitors: stringifyCheckboxes(formData.otherVisitors),
      healthInfoSources: stringifyCheckboxes(formData.healthInfoSources),
      topicsCovered: stringifyCheckboxes(formData.topicsCovered)
    };

    try {
      const response = await fetch('http://localhost:5000/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message} (ID: ${data.id})`);
        setMessageType('success');
        setTimeout(() => setFormData(initialState), 1500);
      } else {
        setMessage(`❌ ${data.message}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`❌ Connection Error. Is the backend running?`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questionnaire-container">
      <InstructionsSection />
      
      <form onSubmit={handleSubmit}>
        <FormHeader 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <DemographicSection 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleCheckboxChange={handleCheckboxChange}
        />
        
        <InformationSection 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleCheckboxChange={handleCheckboxChange}
        />

        <FormActions 
          loading={loading}
          message={message}
          messageType={messageType}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}