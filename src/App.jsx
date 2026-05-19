import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Form from './Pages/form';
import FormHeader from './Components/FormHeader';
import DemographicSection from './Components/DemographicSection'; 
import InformationSection from './Components/InformationSection'; 
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Absolute dynamic matching container tree */}
        <Route path="/workspace/form" element={<Form />}>
          {/* Default address auto-routes directly to step 1 (Header View) */}
          <Route index element={<Navigate to="header-info" replace />} />
          
          {/* Each page mapped perfectly to distinct path targets */}
          <Route path="header-info" element={<FormHeader />} />
          <Route path="demographics" element={<DemographicSection />} />
          <Route path="information" element={<InformationSection />} />
        </Route>

        {/* Fallback Core Handling Triggers */}
        <Route path="/" element={<Navigate to="/workspace/form" replace />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;