import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Authenticate.css';
import Cookies from 'js-cookie';

const Authenticate = () => {
  const [subdomain, setSubdomain] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (Cookies.get('token')) {
      navigate("/tickets", { replace: true });
    }
  }, [navigate])
  
  const auth = () => {
    axios.post("http://localhost:8080/authenticate", {subdomain, email, password})
    .then(response => {
      if (response.status === 200) {
        Cookies.set('token', response.data.token);
        Cookies.set('subdomain', subdomain);
        alert(response.data.message);
        navigate("/tickets", {replace: true})
      }
    }).catch(err => {
      console.log(err);
      alert(err.response.data.message)
    })
  }
  
  
  return (
    <div className="Authenticate">
      <input value={subdomain} onChange={e => setSubdomain(e.target.value)}></input>
      <input value={email} onChange={e => setEmail(e.target.value)}></input>
      <input value={password} onChange={e => setPassword(e.target.value)}></input>
      <button onClick={auth}>AUTHENTICATE</button>
    </div>
  );
}

export default Authenticate;
