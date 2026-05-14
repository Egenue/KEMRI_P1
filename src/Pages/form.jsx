import { useState, useEffect } from 'react';
import FormHeader from '../Components/FormHeader';
import InstructionsSection from '../Components/InstructionsSection';
import DemographicSection from '../Components/DemographicSection';
import InformationSection from '../Components/InformationSection';
import FormActions from '../Components/FormActions';
import './form.css';

export default function Form() {

  const API_URL = import.meta.env.VITE_API_URL;
  
  // Generate unique serial number format: KEMRI-YYYYMMDD-XXXXXX-YYYY
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
    questionnaire_sno: '', school_name: '', supervisor_fname: '', collection_date: '', age: '', stay_with: '',
    guardian_occupation: '', other_guardian_occupation: '', guardian_education: '', religion: '', family_size: '',
    older_siblings: '', siblings_have_relationships: '', pocket_money: '', pocket_money_adequate: '', financial_support: {},
    guardian_visits: '', other_visitors:{} , access_rh_info: '', rh_info_source: {}, topics_covered: {}, info_adequate: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Auto-generate serial number on component mount
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      questionnaire_sno: generateSerialNumber()
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
      setFormData(prev => ({
        ...initialState,
        questionnaire_sno: generateSerialNumber()
      }));
      setMessage('✅ All fields cleared & new serial number generated');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Basic Validation
    if (!formData.school_name || !formData.age) {
      setMessage('⚠️ Please fill in all required fields (School Name and Age)');
      setMessageType('warning');
      return;
    }

    setLoading(true);
    setMessage('');

    // Helper to turn { Relatives: true, Boyfriend: false } into "Relatives"
    const stringifyCheckboxes = (obj) => {
      if (!obj) return '';
      return Object.keys(obj).filter(key => obj[key]).join(', ');
    };

    // Prepare the data for the MySQL backend
    const payload = {
      ...formData,
      // Ensure these keys match what your MySQL Model expects
      financial_support: stringifyCheckboxes(formData.financial_support),
      other_visitors: stringifyCheckboxes(formData.other_visitors),
      rh_info_source: stringifyCheckboxes(formData.rh_info_source),
      topics_covered: stringifyCheckboxes(formData.topics_covered)
    };

    try {
      // FIX: Use API_URL (the variable you defined at the top)
      const response = await fetch(API_URL, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Your backend returns { success: true, questionnaire_id: ... }
        setMessage(`✅ Success! Data saved with ID: ${data.questionnaire_id || data.id}`);
        setMessageType('success');

        // Reset the form after 2 seconds
        setTimeout(() => {
          setFormData({
            ...initialState,
            questionnaire_sno: generateSerialNumber()
          });
          setMessage('');
        }, 2000);

      } else {
        setMessage(`❌ Error: ${data.message || 'Server rejected the data'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error("Submit Error:", error);
      setMessage(`❌ Network Error. Is the backend server running at ${API_URL}?`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questionnaire-container">
      <InstructionsSection />
      <form className="form_data" onSubmit={handleSubmit}>
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