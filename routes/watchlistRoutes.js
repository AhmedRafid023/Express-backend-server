const express = require('express');
const WatchlistController = require('../controllers/WatchlistController');
const WatchlistService = require('../services/WatchlistService');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

watchlistController = new WatchlistController(WatchlistService);

router.post('/add', watchlistController.createWatchlist);
router.post('/check', watchlistController.isInWatchlist);
router.get('/', authMiddleware, watchlistController.list_data);
router.delete('/remove', authMiddleware, watchlistController.deleteWatchlist);

module.exports = router;