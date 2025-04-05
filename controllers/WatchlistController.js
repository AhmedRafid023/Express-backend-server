const jwt = require("jsonwebtoken");

class WatchlistController {

    constructor(WatchlistService) {
        this.watchlistService = WatchlistService;

        // Bind methods to ensure correct "this" context
        this.createWatchlist = this.createWatchlist.bind(this);
        this.isInWatchlist = this.isInWatchlist.bind(this);
        this.list_data = this.list_data.bind(this);
        this.deleteWatchlist = this.deleteWatchlist.bind(this);
    }

    async createWatchlist(req, res) {
        const {user_id, tmdb_id, media_type, title, poster_path, backdrop_path, rating, extra_details} = req.body;

        if (!user_id || !tmdb_id || !media_type || !title) {
            return res.status(400).json({message: "Missing required fields"});
        }

        try {
            // Add to watchlist
            const watchlistItem = await this.watchlistService.addToWatchlist(
                user_id, tmdb_id, media_type, title, poster_path, backdrop_path, rating, extra_details
            );

            res.status(201).json({message: "Added to watchlist", watchlistItem});
        } catch (error) {
            res.status(500).json({message: "Server error", error: error.message});
        }
    }


     async isInWatchlist (req, res){
        const {user_id, tmdb_id, media_type} = req.body;

        if (!user_id || !tmdb_id || !media_type) {
            return res.status(400).json({message: "Missing required fields"});
        }

        try {
            const exist = await this.watchlistService.isInWatchlist(user_id, tmdb_id, media_type);
            console.log(exist);
            res.status(200).json({inWatchlist: exist}); // Always return a response
        } catch (error) {
            res.status(500).json({message: "Server error", error: error.message});
        }
    };

    async list_data(req, res){
        try {
            const userId = req.user.userId;

            // Fetch the user's watchlist from the database
            const watchlist = await this.watchlistService.getWatchlist(userId);

            // Return the watchlist data in the response
            res.status(200).json({watchlist});
        } catch (error) {
            console.error('Error fetching watchlist:', error);
            res.status(500).json({error: 'Failed to fetch watchlist. Please try again later.'});
        }
    };

    async deleteWatchlist(req, res){
        const {tmdb_id, media_type} = req.body;

        if (!tmdb_id || !media_type) {
            return res.status(400).json({message: "Missing required fields"});
        }

        try {
            const user_id = req.user.userId;
            // Remove the item from the watchlist
            const result = await this.watchlistService.removeFromWatchlist(user_id, tmdb_id, media_type);

            // Check if the item was deleted
            if (result === 0) {
                return res.status(404).json({error: 'Item not found in watchlist.'});
            }

            // Return success response
            res.status(200).json({message: 'Item removed from watchlist successfully.'});
        } catch (error) {
            console.error('Error removing item from watchlist:', error);
            res.status(500).json({error: 'Failed to remove item from watchlist. Please try again later.'});
        }
    };
}
module.exports = WatchlistController;