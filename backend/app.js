const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const ticketsRoute = require('./routes/tickets');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

app.use('/', ticketsRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
