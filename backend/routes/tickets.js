const router = require('express').Router();
const ticketsController = require('../controllers/tickets');

router.get('/', ticketsController.ping);
router.post('/authenticate', ticketsController.authenticate);
router.post('/alltickets', ticketsController.getAllTickets);
router.post('/ticket', ticketsController.getTicket);

module.exports = router;
