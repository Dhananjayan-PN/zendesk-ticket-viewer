import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import './TIckets.css';

const Tickets = () => {
  const [tickets, setTickets] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    getTickets();
  }, [])
  
  const getTickets = () => {
    let token = Cookies.get('token');
    let subdomain = Cookies.get('subdomain');
    console.log(token);
    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }
    axios.post("http://localhost:8080/alltickets",
      {subdomain, token, pagesize: 25})
    .then(response => {
      setTickets(response.data.tickets);
    })
    .catch(err => {
      console.log(err);
      alert("Uh oh! Something went wrong! Try again later!")
    })
  }
  
  
  return (
    <div className="Tickets">
      {tickets && tickets.map(e => <div key={e.id}>{e.subject}</div>)}
    </div>
  );
}

export default Tickets;
