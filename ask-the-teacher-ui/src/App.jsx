import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lerenrdkevxavfrctiiz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcmVucmRrZXZ4YXZmcmN0aWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY5OTAsImV4cCI6MjA3Njg5Mjk5MH0.EswqHmwUfAeidxx2YFPy32uLIx9cA6enVypfcpAVI3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

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
