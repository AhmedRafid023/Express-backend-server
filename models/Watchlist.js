const knex = require('../config/db'); // Import your Knex instance

class Watchlist {
    /**
     * Add a movie or TV show to the user's watchlist.
     * @param {number} userId - The ID of the user.
     * @param {string} tmdbId - The TMDb ID of the media item.
     * @param {string} mediaType - The type of media ('movie' or 'tv').
     * @param {string} title - The title of the media item.
     * @param {string} posterPath - The path to the poster image.
     * @param {string} backdropPath - The path to the backdrop image.
     * @param {object} extraDetails - Additional details about the media item.
     * @returns {Promise<object>} - The newly created watchlist item.
     */
    static async addToWatchlist(userId, tmdbId, mediaType, title, posterPath, backdropPath, extraDetails = {}) {
        return knex('watchlist').insert({
            user_id: userId,
            tmdb_id: tmdbId,
            media_type: mediaType,
            title,
            poster_path: posterPath,
            backdrop_path: backdropPath,
            extra_details: extraDetails,
        }).returning('*');
    }

    /**
     * Remove a movie or TV show from the user's watchlist.
     * @param {number} userId - The ID of the user.
     * @param {string} tmdbId - The TMDb ID of the media item.
     * @param {string} mediaType - The type of media ('movie' or 'tv').
     * @returns {Promise<number>} - The number of rows deleted.
     */
    static async removeFromWatchlist(userId, tmdbId, mediaType) {
        return knex('watchlist')
            .where({ user_id: userId, tmdb_id: tmdbId, media_type: mediaType })
            .del();
    }

    /**
     * Check if a movie or TV show is in the user's watchlist.
     * @param {number} userId - The ID of the user.
     * @param {string} tmdbId - The TMDb ID of the media item.
     * @param {string} mediaType - The type of media ('movie' or 'tv').
     * @returns {Promise<boolean>} - True if the item is in the watchlist, false otherwise.
     */
    static async isInWatchlist(userId, tmdbId, mediaType) {
        const item = await knex('watchlist')
            .where({ user_id: userId, tmdb_id: tmdbId, media_type: mediaType })
            .first();
        return !!item;
    }

    /**
     * Get the user's watchlist.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Array>} - The list of items in the user's watchlist.
     */
    static async getWatchlist(userId) {
        return knex('watchlist')
            .where({ user_id: userId })
            .select('*');
    }

    /**
     * Get a specific watchlist item by ID.
     * @param {number} id - The ID of the watchlist item.
     * @returns {Promise<object>} - The watchlist item.
     */
    static async getWatchlistItemById(id) {
        return knex('watchlist')
            .where({ id })
            .first();
    }
}

module.exports = Watchlist;