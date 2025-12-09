import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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


// Error handling


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})