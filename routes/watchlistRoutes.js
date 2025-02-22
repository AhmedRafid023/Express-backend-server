const express = require('express');
const watchlistController = require('../controllers/watchlistController');

const router = express.Router();


router.post('/add', watchlistController.createWatchlist);
router.post('/check', watchlistController.isInWatchlist);
router.get('/:userId', watchlistController.list_data);
router.delete('/remove', watchlistController.deleteWatchlist);

module.exports = router;