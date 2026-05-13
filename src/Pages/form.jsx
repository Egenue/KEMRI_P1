import { useState } from 'react';
import FormHeader from '../Components/FormHeader';
import InstructionsSection from '../Components/InstructionsSection';
import DemographicSection from '../Components/DemographicSection';
import InformationSection from '../Components/InformationSection';
import FormActions from '../Components/FormActions';
import './form.css';

const [formData, setFormData] = useState({
    // Header Info
    serialNumber: '',
    schoolName: '',
    supervisorName: '',
    dateCollection: '',
    
    // Demographic
    age: '',
    stayWith: '',
    guardianOccupation: '',
    guardianOccupationOther: '',
    guardianEducation: '',
    religion: '',
    ethnicity: '',
    familySize: '',
    olderSiblings: '',
    siblingsPartnered: '',
    parentsPocketMoney: '',
    pocketMoneyAdequate: '',
    financialNeeds: {},
    guardianVisits: '',
    otherVisitors: {},
    
    // Sources of Info & Sexual Behavior
    reproductiveHealthAccess: '',
    healthInfoSources: {},
    topicsCovered: {},
    informationAdequate: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
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
    if (window.confirm('Are you sure you want to clear all fields? This cannot be undone.')) {
      setFormData({
        serialNumber: '', schoolName: '', supervisorName: '', dateCollection: '',
        age: '', stayWith: '', guardianOccupation: '', guardianOccupationOther: '',
        guardianEducation: '', religion: '', ethnicity: '', familySize: '',
        olderSiblings: '', siblingsPartnered: '', parentsPocketMoney: '',
        pocketMoneyAdequate: '', financialNeeds: {}, guardianVisits: '',
        otherVisitors: {}, reproductiveHealthAccess: '', healthInfoSources: {},
        topicsCovered: {}, informationAdequate: ''
      });
      setMessage('✅ All fields cleared successfully');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.serialNumber || !formData.schoolName) {
      setMessage('⚠️ Please fill in at least Serial Number and School Name');
      setMessageType('warning');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message} (ID: ${data.id})`);
        setMessageType('success');
        
        setTimeout(() => {
          setFormData({
            serialNumber: '', schoolName: '', supervisorName: '', dateCollection: '',
            age: '', stayWith: '', guardianOccupation: '', guardianOccupationOther: '',
            guardianEducation: '', religion: '', ethnicity: '', familySize: '',
            olderSiblings: '', siblingsPartnered: '', parentsPocketMoney: '',
            pocketMoneyAdequate: '', financialNeeds: {}, guardianVisits: '',
            otherVisitors: {}, reproductiveHealthAccess: '', healthInfoSources: {},
            topicsCovered: {}, informationAdequate: ''
          });
        }, 1500);
      } else {
        setMessage(`❌ ${data.message}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage(`❌ Error: ${error.message}. Make sure backend is running on http://localhost:5000`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  

export default function Form() {
  return (
    <>
    <InstructionsSection />
    <FormHeader 
      formData={formData}
      handleInputChange={handleInputChange}
    />
    <DemographicSection 
      formData={formData}
      handleInputChange={handleInputChange}
    />
    <FormActions 
      handleSubmit={handleSubmit}
    />
    <InformationSection />

    </>
  );
}