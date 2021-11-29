import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from "react-router-dom";
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
			{ticket && ticket.subject}
		</div>
	);
}

export default Ticket
