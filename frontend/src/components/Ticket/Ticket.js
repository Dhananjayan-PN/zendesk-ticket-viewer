import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Ticket.css';

const Ticket = (props) => {
	const [ticket, setTicket] = useState(null);
	const params = useParams();
	const navigate = useNavigate();
	
	useEffect(() => {
		getTicket();
	}, [])
	
	const getTicket = () => {
		let token = Cookies.get('token');
		let subdomain = Cookies.get('subdomain');
		console.log(token);
		if (!token) {
			navigate("/auth", { replace: true });
			return;
		}
		axios.post("http://localhost:8080/ticket",
			{subdomain, token, id: params.id})
		.then(response => {
			setTicket(response.data.ticket);
		})
		.catch(err => {
			console.log(err);
			alert("Uh oh! Something went wrong! Try again later!")
		})
	}
	
	return (
		<div className="Ticket">
			{ticket && 
			<div>
				<Typography variant="h4" component="div">
        			{"Subject: " + ticket.subject ?? "NA"}
      			</Typography>
				<Typography variant="body1" component="div">
        			{"Created: " + new Date(ticket.created_at).toLocaleString()}
      			</Typography>
				<Typography variant="body1" component="div">
        			{"Updated: " + new Date(ticket.updated_at).toLocaleString()}
      			</Typography>
				<Typography variant="body1" component="div">
        			{"Status: " + ticket.status}
      			</Typography>
				<Typography variant="body1" component="div">
        			{"Description: " + ticket.description}
      			</Typography>
				<Typography variant="body1" component="div">
        			{"Priority: " + ticket.priority}
      			</Typography>
			</div>}
			<Button style={{display: "flex", marginTop: 20}} variant="outlined" onClick={() => navigate("/tickets", {replace: true})}>
				Go Back
			</Button>
			
		</div>
	);
}

export default Ticket
