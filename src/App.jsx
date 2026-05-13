import { useState } from 'react'
import Form from './Components/form';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Form />
    </>
  )
}

export default App;