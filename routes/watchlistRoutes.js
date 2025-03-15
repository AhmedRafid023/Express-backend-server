const express = require('express');
const WatchlistController = require('../controllers/WatchlistController');
const WatchlistService = require('../services/WatchlistService');

const router = express.Router();

watchlistController = new WatchlistController(WatchlistService);

router.post('/add', watchlistController.createWatchlist);
router.post('/check', watchlistController.isInWatchlist);
router.get('/:userId', watchlistController.list_data);
router.delete('/remove', watchlistController.deleteWatchlist);

module.exports = router;