import pool from "../config/db.js";

export const User = {

    // create user
    create: async ({ name, email, password, address, role }) => {
        const query = `
            INSERT INTO users (name, email, password, address, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, email, role, created_at;
        `;

        const values = [name, email, password, address, role];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // find user by email
    findByEmail: async (email) => {
        const query = `SELECT * FROM  users WHERE email = $1`;
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    },

    // find user by id
    findById: async (id) => {
        const query = `SELECT 
        id, name, email, role, address, created_at
        FROM users
        WHERE id = $1;
        `
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};