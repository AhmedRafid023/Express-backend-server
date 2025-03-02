const mongoose = require('mongoose');

// Define the Watchlist Schema
const watchlistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model (if you have one)
    },
    tmdb_id: {
        type: String,
        required: true,
    },
    media_type: {
        type: String,
        required: true,
        enum: ['movie', 'tv'], // Ensure media_type is either 'movie' or 'tv'
    },
    title: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
    backdrop_path: {
        type: String,
        required: true,
    },
    extra_details: {
        type: Object,
        default: {},
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Watchlist Model
const WatchlistModel = mongoose.model('Watchlist', watchlistSchema);

module.exports = WatchlistModel;