import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* other routes can go here later */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
