const router = require('express').Router();
const ticketsController = require('../controllers/tickets');

router.get('/', ticketsController.getTicket);

module.exports = router;
