import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Tickets.css';

const Tickets = () => {
  const [tickets, setTickets] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    getTickets();
  }, [])
  
  const getTickets = () => {
    let token = Cookies.get('token');
    let subdomain = Cookies.get('subdomain');
    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }
    if (prev || !next)
    axios.post("http://localhost:8080/alltickets",
      {subdomain, token, pagesize: 25})
    .then(response => {
      console.log(response);
      setTickets(response.data.tickets);
      setPrev(response.data.links.prev);
      setNext(response.data.links.next);
      setHasMore(response.data.meta.has_more);
    })
    .catch(err => {
      console.log(err);
      alert("Uh oh! Something went wrong! Try again later!")
    })
  }
  
  const getNext = () => {
    let token = Cookies.get('token');
    let subdomain = Cookies.get('subdomain');
    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }
    axios.post("http://localhost:8080/alltickets",
      {subdomain, token, url: next})
    .then(response => {
      console.log(response);
      setTickets(response.data.tickets);
      setPrev(response.data.links.prev);
      setNext(response.data.links.next);
      setHasMore(response.data.meta.has_more);
      setPage(page + 1);
    })
    .catch(err => {
      console.log(err);
      alert("Uh oh! Something went wrong! Try again later!")
    })
  }
  
  const getPrev = () => {
    let token = Cookies.get('token');
    let subdomain = Cookies.get('subdomain');
    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }
    axios.post("http://localhost:8080/alltickets",
      {subdomain, token, url: prev})
    .then(response => {
      setTickets(response.data.tickets);
      setPrev(response.data.links.prev);
      setNext(response.data.links.next);
      setPage(page - 1);
      setHasMore(response.data.meta.has_more);
    })
    .catch(err => {
      console.log(err);
      alert("Uh oh! Something went wrong! Try again later!")
    })
  }
  
  const signOut = () => {
    Cookies.remove('token');
    Cookies.remove('subdomain');
    navigate("/auth", { replace: true });
  }
  
  
  return (
    <div className="Tickets">
      <div style={{position: "relative"}}>
        <Typography variant="h4" style={{textAlign: "center", fontSize: 40}}  component="div">
          All Tickets
        </Typography>
        <Typography variant="caption" style={{textAlign: "center", marginBottom: 20}} gutterBottom display="block">
          {`${Cookies.get('subdomain')}.zendesk.com`}
        </Typography>
        <Button style={{position: "absolute", right: 0, top: 10}} variant="outlined" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <div className="ticket-container">
        {tickets && tickets.map(e => 
          <div className="ticket" onClick={() => navigate(`/tickets/${e.id}`, { replace: true })} key={e.id}>
            <Typography variant="body1" component="div" style={{fontWeight: "bold"}}>
              {e.subject}
            </Typography>
            <Typography variant="caption" component="div">
              {e.description.substring(0, 150)}
            </Typography>
            <Typography variant="caption" component="div" style={{marginTop: 8, color: "#343434"}}>
              {new Date(e.created_at).toLocaleString()}
            </Typography>
          </div>)
        }
      </div>
      <div style={{display:"flex", margin: "25px 0px", alignItems: "center", justifyContent: "center"}}>
          {prev && <Button variant="outlined" onClick={getPrev} disabled={page === 1}>
            Previous Page
          </Button>}
          <Typography variant="overline" style={{textAlign: "center", margin: "10px 20px"}}  component="div">
            Page: {page}
          </Typography>
          {next && <Button variant="outlined" onClick={getNext} disabled={!hasMore}>
            Next Page
          </Button>}
        </div>
    </div>
  );
}

export default Tickets;
