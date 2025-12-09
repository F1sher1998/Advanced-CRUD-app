import pkg from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const { Pool } = pkg;

// Create a new pool instance to manage PostgreSQL connections
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});


pool.on('connect', () => {
    console.log('Connected to the database☕');
}).on('error', (err) => {
    console.error('Unexpected error on idle client⛓️‍💥', err);
    process.exit(-1);
});


export default pool;