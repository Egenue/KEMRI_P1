import { useState, useEffect } from 'react';
import FormHeader from '../Components/FormHeader';
import InstructionsSection from '../Components/InstructionsSection';
import DemographicSection from '../Components/DemographicSection';
import InformationSection from '../Components/InformationSection';
import FormActions from '../Components/FormActions';
import './form.css';

export default function Form() {
  // Use Vite environment variable with a local fallback to avoid "undefined" URL
  const API_URL = import.meta.env.VITE_API_URL;
  
  const generateSerialNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `KEMRI-${year}${month}${day}-${timestamp}-${random}`;
  };

  const initialState = {
  questionnairesno: '', 
  schoolname: '', 
  supervisorfname: '', 
  collectiondate: '', 
  age: '', 
  staywith: '',
  guardianoccupation: '', 
  otherguardianoccupation: '', 
  guardianeducation: '', 
  religion: '', 
  familysize: '',
  oldersiblings: '', 
  siblingshaverelationships: '', 
  pocketmoney: '', 
  pocketmoneyadequate: '', 
  financialsupport: {}, 
  guardianvisits: '', 
  othervisitors: {}, 
  accessrhinfo: '', 
  rhinfosource: {}, 
  topicscovered: {}, 
  infoadequate: ''
};

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      questionnairesno: generateSerialNumber()
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (section, option) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}), // Safety: spread existing or empty object
        [option]: !prev[section]?.[option] // Toggle value safely
      }
    }));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({
        ...initialState,
        questionnairesno: generateSerialNumber()
      });
      setMessage('✅ All fields cleared');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.schoolname || !formData.age) {
      setMessage('⚠️ Please fill in all required fields (School Name and Age)');
      setMessageType('warning');
      return;
    }

    setLoading(true);
    setMessage('');

    const stringifyCheckboxes = (obj) => {
      if (!obj) return '';
      return Object.keys(obj).filter(key => obj[key]).join(', ');
    };

    const payload = {
      ...formData,
      financialsupport: stringifyCheckboxes(formData.financialsupport),
      othervisitors: stringifyCheckboxes(formData.othervisitors),
      rhinfosource: stringifyCheckboxes(formData.rhinfosource),
      topicscovered: stringifyCheckboxes(formData.topicscovered)
    };

    try {
      const response = await fetch(API_URL, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Success! Data saved ID: ${data.id}`);
        setMessageType('success');
        setTimeout(() => {
          setFormData({ ...initialState, questionnairesno: generateSerialNumber() });
          setMessage('');
        }, 2000);
      } else {
        setMessage(`❌ Error: ${data.message}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`❌ Network Error. Is the backend running?`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questionnaire-container">
      <InstructionsSection />
      <form className="form_data" onSubmit={handleSubmit}>
        <FormHeader formData={formData} handleInputChange={handleInputChange} />
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