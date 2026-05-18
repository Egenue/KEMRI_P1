import { useState } from 'react'
import Form from './Pages/form';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Form />
    </>
  )
}

export default App;