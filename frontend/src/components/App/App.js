import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Authenticate from '../Authenticate/Authenticate';
import Tickets from '../Tickets/Tickets';
import Ticket from '../Ticket/Ticket';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = Cookies.get('token');
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [navigate])

  
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Authenticate />} />
        <Route exact path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:id" element={<Ticket />} />
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
