import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

export const signToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
}


export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

/// Hash password

export const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}


export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}


// Get user by email
export const getUserByRefresh = async (refreshToken) => {
    const result = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken]);
    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};


export const updateUserRefreshToken = async (userId, refreshToken) => {
    const result = await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *", 
        [refreshToken, userId]
    );
    return result.rows[0];
}




