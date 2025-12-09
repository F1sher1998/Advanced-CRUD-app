import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();


// Load environment variables
const app = express();
const PORT = process.env.PORT || 4002;


// Security
app.use(cors());


// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api', userRouter);

// Error handling
app.use(errorHandler);

// Database connection test
pool.connect()
    .then(async client => {
        const query = 'SELECT NOW()::date AS "theTime"';
        const result = await client.query(query)
        console.log(result.rows[0].theTime)})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})