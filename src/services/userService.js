import pool from "../config/db.js";


export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

export const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

export const createUser = async (userData) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", 
        [userData.name, userData.email, userData.password]
    );
    return result.rows[0];
};

export const updateUser = async (id, userData) => {
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", 
        [userData.name, userData.email, id]
    );
    return result.rows[0];
};

export const deleteUser = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};