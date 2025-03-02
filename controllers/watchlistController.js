const WatchlistService = require('../services/WatchlistService');

const createWatchlist = async (req, res) => {
    const { user_id, tmdb_id, media_type, title, poster_path, backdrop_path, extra_details } = req.body;

    if (!user_id || !tmdb_id || !media_type || !title) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Add to watchlist
        const watchlistItem = await WatchlistService.addToWatchlist(
            user_id, tmdb_id, media_type, title, poster_path, backdrop_path, extra_details
        );

        res.status(201).json({ message: "Added to watchlist", watchlistItem });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const isInWatchlist = async (req, res) => {
    const { user_id, tmdb_id, media_type } = req.body;

    if (!user_id || !tmdb_id || !media_type) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const exist = await WatchlistService.isInWatchlist(user_id, tmdb_id, media_type);
        console.log(exist);
        res.status(200).json({ inWatchlist: exist }); // Always return a response
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const list_data = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the user's watchlist from the database
        const watchlist = await WatchlistService.getWatchlist(userId);

        // Return the watchlist data in the response
        res.status(200).json({ watchlist });
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Failed to fetch watchlist. Please try again later.' });
    }
};

const deleteWatchlist = async (req, res) => {
    const { user_id, tmdb_id, media_type } = req.body;

    try {
        // Remove the item from the watchlist
        const result = await WatchlistService.removeFromWatchlist(user_id, tmdb_id, media_type);

        // Check if the item was deleted
        if (result === 0) {
            return res.status(404).json({ error: 'Item not found in watchlist.' });
        }

        // Return success response
        res.status(200).json({ message: 'Item removed from watchlist successfully.' });
    } catch (error) {
        console.error('Error removing item from watchlist:', error);
        res.status(500).json({ error: 'Failed to remove item from watchlist. Please try again later.' });
    }
};
module.exports = {
    createWatchlist: createWatchlist,
    isInWatchlist: isInWatchlist,
    list_data: list_data,
    deleteWatchlist: deleteWatchlist,
}