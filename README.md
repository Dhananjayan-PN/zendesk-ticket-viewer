# Zendesk-Ticket-Viewer

A simple Ticket Viewer made with a Node-Express API and a React Frontend. 

## General Flow

The React frontend takes the user's `subdomain`, `email` and `password` for authentication. It sends this to the Node API. The Ticket Viewer API talks to the Zendesk API and tries to authenticate and fetch the OAuth Token. This token is then used to fetch all the tickets from the Zendesk API. The React frontend displays all tickets and individual tickets in an easy to read manner with pagination when there are more than 25 tickets.

## Installation and Usage

1. Clone the repository: `git clone https://github.com/Dhananjayan-PN/zendesk-ticket-viewer`
2. Install all packages: `cd frontend && npm install && cd ../backend && npm install`
3. Create a .env in the backend folder to store the `CLIENT_ID` for OAuth
4. Navigate to the backend folder and start both servers: `cd backend && npm run servers`
	
Both development servers will start shortly and http://localhost:3000 will open in your browser showing you the Authentication page. In the authentication page enter your subdomain and user credentials to look at all the tickets. The API will be running at http://localhost:8080 listening for requests.
	

 
