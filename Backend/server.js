import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as QuestionnaireController from './Controllers/questionnaireController.js';

dotenv.config({ path: './.env' });
const app = express();

app.use(cors(
  corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000' || '',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }
));
app.use(express.json());

// Routes
app.post('/api/questionnaire', QuestionnaireController.submitForm);
app.get('/api/questionnaires', QuestionnaireController.getAllForms);
app.get('/api/questionnaire/:id', QuestionnaireController.getOneForm);
app.put('/api/questionnaire/:id', QuestionnaireController.updateForm);
app.delete('/api/questionnaire/:id', QuestionnaireController.deleteForm);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));