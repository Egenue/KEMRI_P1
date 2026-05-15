import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as QuestionnaireController from './Controllers/questionnaireController.js';

dotenv.config({ path: './.env' });
const app = express();

const corsOptions = {
    origin: [
        'http://localhost:5173', 
        'http://localhost:5174', 
        'http://localhost:5175',
        'https://kemri-p1.vercel.app' 
    ], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.post('/api/questionnaire', QuestionnaireController.submitForm);
app.get('/api/questionnaires', QuestionnaireController.getAllForms);
app.get('/api/questionnaire/:id', QuestionnaireController.getOneForm);
app.put('/api/questionnaire/:id', QuestionnaireController.updateForm);
app.delete('/api/questionnaire/:id', QuestionnaireController.deleteForm);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));