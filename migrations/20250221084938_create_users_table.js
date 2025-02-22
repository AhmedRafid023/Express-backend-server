/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.string('name', 255).notNullable(); // Name column
        table.string('email', 255).notNullable().unique(); // Email column (unique)
        table.string('password', 255).notNullable(); // Password column
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp column
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
