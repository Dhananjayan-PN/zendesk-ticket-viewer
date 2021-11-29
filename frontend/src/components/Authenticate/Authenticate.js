import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Authenticate.css';

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
      <Typography variant="h5" style={{textAlign: "center"}} gutterBottom component="div">
        Authenticate
      </Typography>
      <TextField className="input-field" style={{marginBottom: 10}} label="Subdomain" variant="standard" value={subdomain} onChange={e => setSubdomain(e.target.value)}></TextField>
      <TextField className="input-field" style={{marginBottom: 10}}label="Email" variant="standard" value={email} onChange={e => setEmail(e.target.value)}></TextField>
      <TextField className="input-field" style={{marginBottom: 10}} label="Password" variant="standard" type="password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
      <Button style={{display: "flex", margin: "30px auto", marginBottom: 10}} variant="outlined" onClick={auth}>Authenticate</Button>
    </div>
  );
}

export default Authenticate;
