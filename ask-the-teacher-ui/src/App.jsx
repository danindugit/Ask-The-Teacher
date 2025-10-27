import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseConfig';

function App() {
  const [setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  })

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
