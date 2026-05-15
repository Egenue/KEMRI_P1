import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the pool connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
        console.error('Error code:', err.code);
    } else {
        console.log('✅ Connected to Railway MySQL database pool successfully!');
        console.log(`Host: ${process.env.DB_HOST}`);
        connection.release(); // Return connection to the pool
    }
});

// Export the pool. We can still call it 'connection' in other files 
// so you don't have to rewrite your model!
export default pool;