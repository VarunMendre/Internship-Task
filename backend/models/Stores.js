import pool from "../config/db.js";

export const Store = {
    create: async ({ owner_id, name, email, address }, client = pool) => {
        const query = `
            INSERT INTO stores (owner_id, name, email, address)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [owner_id, name, email, address];
        const { rows } = await client.query(query, values);
        return rows[0];
    },

    findAll: async (filters = {}) => {
        // fuzzy search later
        
        const query = `SELECT * FROM stores ORDER BY created_at DESC`;
        const { rows } = await pool.query(query);
        return rows;
    }
};