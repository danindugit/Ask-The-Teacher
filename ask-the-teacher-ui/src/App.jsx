import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import QuestionDetail from './QuestionDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
