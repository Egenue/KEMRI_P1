import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

const db_password = process.env.DB_PASSWORD;
const db_user = process.env.DB_USER;
const db_host = process.env.DB_HOST;
const db_port = parseInt(process.env.DB_PORT) || 3306;
const db_name = process.env.DB_NAME;

const connectionConfig = {
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_name,
    port: db_port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
        console.error('Error code:', err.code);
        console.log('Connection config:', {
            host: db_host,
            user: db_user,
            port: db_port,
            database: db_name
        });
        console.log('Retrying in 5 seconds...');
        setTimeout(() => {
            connection.connect();
        }, 5000);
    } else {
        console.log('✅ Connected to MySQL database successfully!');
        console.log(`Host: ${db_host}`);
        console.log(`Database: ${db_name}`);
    }
});

// Reconnect if connection is lost
connection.on('error', (err) => {
    console.error('Database error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Connection lost, reconnecting...');
        connection.connect();
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.log('Too many connections, reconnecting...');
        connection.connect();
    }
    if (err.code === 'ECONNREFUSED') {
        console.log('Connection refused, reconnecting...');
        connection.connect();
    }
});

export default connection;