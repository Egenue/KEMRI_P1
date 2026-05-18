import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Form from './Pages/form';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/form" />} />

        {/* Public form */}
        <Route path="/form" element={<Form />} />

        {/* Admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin dashboard */}
        <Route path="/dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;