import { useState, useEffect } from 'react';
import FormHeader from '../Components/FormHeader';
import InstructionsSection from '../Components/InstructionsSection';
import DemographicSection from '../Components/DemographicSection';
import InformationSection from '../Components/InformationSection';
import FormActions from '../Components/FormActions';
import './form.css';

export default function Form() {
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
    
    if (!formData.school_name) {
      setMessage('⚠️ Please fill in the School Name');
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
      financial_support: stringifyCheckboxes(formData.financial_support),
      other_visitors: stringifyCheckboxes(formData.other_visitors),
      rh_info_source: stringifyCheckboxes(formData.rh_info_source),
      topics_covered: stringifyCheckboxes(formData.topics_covered)
    };

    try {

      /* Change url before deployment */

      const response = await fetch('http://localhost:5000/api/questionnaire', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message} (ID: ${data.id})`);
        setMessageType('success');
        setTimeout(() => setFormData(prev => ({
          ...initialState,
          questionnaire_sno: generateSerialNumber()
        })), 1500);
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