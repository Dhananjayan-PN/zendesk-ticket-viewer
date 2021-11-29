const router = require('express').Router();
const ticketsController = require('../controllers/tickets');

router.get('/', ticketsController.ping);
router.post('/authenticate', ticketsController.authenticate);
router.post('/tickets', ticketsController.getTickets);

module.exports = router;
