/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('watchlist', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable(); // Foreign key to users table
        table.string('tmdb_id').notNullable(); // Store TMDb ID (can be string as TMDb IDs can be numeric or alphanumeric)
        table.string('media_type').notNullable(); // 'movie' or 'tv'
        table.string('title').notNullable(); // Title of the movie/TV show
        table.string('poster_path'); // Path to the poster image (from TMDb)
        table.string('backdrop_path'); // Path to the backdrop image (from TMDb)
        table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp of when it was added
        table.json('extra_details'); // Store other TMDb details as JSON (optional, but recommended)

        table.foreign('user_id').references('id').inTable('users'); // Assuming your user table is named 'users'
        table.unique(['user_id', 'tmdb_id', 'media_type']); // Prevent duplicate entries for the same user and media item
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('watchlist');
};
