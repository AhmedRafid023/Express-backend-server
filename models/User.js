const db = require('../config/db');

class User {
    static async create(user) {
        const { name, email, password } = user;
        const [result] = await db('users').insert({ name, email, password }).returning('*');
        return result;
    }

    static async findByEmail(email) {
        const rows = await db('users').select('*').where({ email });
        return rows[0]; // Return the first matching user
    }
}

module.exports = User;
