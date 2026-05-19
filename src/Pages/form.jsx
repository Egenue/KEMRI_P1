import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import InstructionsSection from '../Components/InstructionsSection';
import FormActions from '../Components/FormActions';
import './form.css';

const createInitialState = () => ({
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
});

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultApiUrl = import.meta.env.DEV ? 'https://kemri-p1.onrender.com/api' : '';
  const API_BASE_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, '');
  const API_URL = `${API_BASE_URL}/api/questionnaires`;
  
  const generateSerialNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `KEMRI-${year}${month}${day}-${timestamp}-${random}`;
  };

  const [formData, setFormData] = useState(createInitialState);
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
        ...prev[section],
        [option]: !prev[section][option]
      }
    }));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      const freshState = createInitialState();
      freshState.questionnairesno = generateSerialNumber();
      setFormData(freshState);
      setMessage('✅ All fields cleared');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
      navigate('header-info'); // Send back to step 1
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.schoolname || !formData.age) {
      setMessage('⚠️ Please fill in all required fields (School Name and Age)');
      setMessageType('warning');
      navigate('demographics');
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
        const savedId = data.questionnairesno || data.id || formData.questionnairesno;
        setMessage(`✅ Success! Data saved ID: ${savedId}`);
        setMessageType('success');
        setTimeout(() => {
          const freshState = createInitialState();
          freshState.questionnairesno = generateSerialNumber();
          setFormData(freshState);
          setMessage('');
          navigate('header-info');
        }, 2000);
      } else {
        setMessage(`❌ Error: ${data.message || 'Server rejected request'}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`❌ Network Error. Is the backend running?`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Determine current active step for the bottom actions bar
  const currentPath = location.pathname;
  const isFirstStep = currentPath.includes('header-info');
  const isSecondStep = currentPath.includes('demographics');
  const isFinalStep = currentPath.includes('information');

  return (
    <div className="questionnaire-container">
      <InstructionsSection />
      <form className="form_data" onSubmit={handleSubmit}>
        
        {/* The active route element renders alone here */}
        <Outlet context={{ formData, handleInputChange, handleCheckboxChange }} />

        <FormActions 
          loading={loading}
          message={message}
          messageType={messageType}
          handleClear={handleClear}
          isFirstStep={isFirstStep}
          isSecondStep={isSecondStep}
          isFinalStep={isFinalStep}
        />
      </form>
    </div>
  );
}