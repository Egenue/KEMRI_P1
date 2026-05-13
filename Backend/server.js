import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './Config/db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: '✅ Server is running',
    timestamp: new Date().toISOString(),
    database: 'Railway MySQL'
  });
});

// Test database endpoint
app.get('/api/db-test', (req, res) => {
  connection.query('SELECT 1 as connection_test', (error, results) => {
    if (error) {
      console.error('Database test error:', error);
      return res.status(500).json({
        message: '❌ Database connection failed',
        error: error.message
      });
    }
    res.status(200).json({
      message: '✅ Database connection successful',
      result: results
    });
  });
});

// Sample route for questionnaire data
app.post('/api/questionnaire', (req, res) => {
  try {
    const formData = req.body;
    
    // Insert questionnaire data into database
    const query = `
      INSERT INTO questionnaires 
      (serialNumber, schoolName, supervisorName, dateCollection, age, stayWith, guardianOccupation, religion, familySize, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const values = [
      formData.serialNumber || null,
      formData.schoolName || null,
      formData.supervisorName || null,
      formData.dateCollection || null,
      formData.age || null,
      formData.stayWith || null,
      formData.guardianOccupation || null,
      formData.religion || null,
      formData.familySize || null
    ];
    
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting questionnaire:', error);
        return res.status(500).json({
          message: '❌ Error saving questionnaire',
          error: error.message
        });
      }
      
      res.status(201).json({
        message: '✅ Questionnaire saved successfully',
        id: results.insertId,
        timestamp: new Date().toISOString()
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      message: '❌ Server error',
      error: error.message
    });
  }
});

// Get all questionnaires
app.get('/api/questionnaires', (req, res) => {
  const query = 'SELECT * FROM questionnaires ORDER BY createdAt DESC';
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving questionnaires:', error);
      return res.status(500).json({
        message: '❌ Error retrieving questionnaires',
        error: error.message
      });
    }
    
    res.status(200).json({
      message: '✅ Questionnaires retrieved successfully',
      count: results.length,
      data: results
    });
  });
});

// Get single questionnaire
app.get('/api/questionnaires/:id', (req, res) => {
  const query = 'SELECT * FROM questionnaires WHERE id = ?';
  
  connection.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error('Error retrieving questionnaire:', error);
      return res.status(500).json({
        message: '❌ Error retrieving questionnaire',
        error: error.message
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({
        message: '❌ Questionnaire not found'
      });
    }
    
    res.status(200).json({
      message: '✅ Questionnaire retrieved successfully',
      data: results[0]
    });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: '❌ Endpoint not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: '❌ Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 KEMRI Backend Server Running    ║
╠════════════════════════════════════════╣
║ Port: ${PORT}                              
║ Environment: ${process.env.NODE_ENV || 'development'}                     
║ Database: Railway MySQL                ║
║                                        ║
║ 🔗 Test Health: GET /api/health        ║
║ 🔗 Test DB: GET /api/db-test           ║
║ 🔗 Save Form: POST /api/questionnaire  ║
║ 🔗 Get All: GET /api/questionnaires    ║
║ 🔗 Get One: GET /api/questionnaires/:id║
╚════════════════════════════════════════╝
  `);
});

export default app;

