import pool from "../config/db.js";


export const Rating = {
    upsert: async ({ user_id, store_id, rating, comment }) => {
        const query = `
        INSERT INTO ratings (user_id, store_id, rating, comment, updated_at)
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (user_id, store_id)
        DO UPDATE SET
        rating = EXCLUDED.rating,
        comment = EXCLUDED.comment,
        updated_at = NOW()
        RETURNING *
        `;

        const values = [user_id, store_id, rating, comment];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // Get all ratings for a specific store (including User Names for Owner Dashboard)
    findByStoreId: async (store_id) => {
        const query = `
            SELECT r.*, u.name as user_name
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.store_id = $1
            ORDER BY r.created_at DESC;
        `;
        const { rows } = await pool.query(query, [store_id]);
        return rows;
    },


    findUserRatingForStore: async (user_id, store_id) => {
        const query = `
        Select * from ratings
        Where user_id = $1 AND store_id = $2;
        `;
        const { rows } = await pool.query(query, [user_id, store_id]);
        return rows[0];
    },
};