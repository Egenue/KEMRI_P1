import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Form from './Pages/form';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Facing Form Route (Adding this back in case you need it) */}
        <Route path="/" element={<Form />} />

        {/* Public Facing Admin Route */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Secure Portal Shell Gateway */}
        <Route element={<ProtectedRoute />}>
          {/* All views nested inside here are automatically authenticated */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;