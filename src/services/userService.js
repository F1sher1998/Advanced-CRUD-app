import pool from "../config/db.js";
import * as auth from '../auth/index.js';


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
        "INSERT INTO users (name, email, hashedpassword) VALUES ($1, $2, $3) RETURNING *", 
        [userData.name, userData.email, userData.hashedPassword]
    );
    return result.rows[0];
};


export const loginUser = async(res, email, password) => {
    const userData = await auth.getUserByEmail(email);

    const verifiedPassword = await auth.comparePassword(password, userData.hashedpassword);
    if(!verifiedPassword){
        return null;
    } 
   
    
    // Generate tokens
    const accessToken = auth.signToken(
        { id: userData.id, email: userData.email }, 
        process.env.JWT_ACCESS_SECRET, 
        process.env.JWT_ACCESS_EXPIRES_IN
    )

    const refreshToken = auth.signToken(
        { id: userData.id, email: userData.email }, 
        process.env.JWT_REFRESH_SECRET, 
        process.env.JWT_REFRESH_EXPIRES_IN
    )


    // Update refresh token in DB
    await auth.updateUserRefreshToken(userData.id, refreshToken);

    // cookie the tokens

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return userData;
}


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