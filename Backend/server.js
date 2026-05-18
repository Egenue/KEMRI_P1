import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as QuestionnaireController from './Controllers/questionnaireController.js';
import adminLogonRoutes from './routes/adminLogon.js';

// Use CommonJS for routes since they use require/module.exports
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

dotenv.config({ path: './.env' });
const app = express();

// MongoDB Connection
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

const defaultOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:5175',
    'http://127.0.0.1:5175',
    'https://kemri-p1.vercel.app'
];

const configuredOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

const allowedOrigins = [...new Set([...defaultOrigins, ...configuredOrigins])];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
    }

    return next(err);
});

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/adminLogon', adminLogonRoutes);
app.post('/api/questionnaires', QuestionnaireController.submitForm);
app.get('/api/questionnaires', QuestionnaireController.getAllForms);
app.get('/api/questionnaires/:id', QuestionnaireController.getOneForm);
app.put('/api/questionnaires/:id', QuestionnaireController.updateForm);
app.delete('/api/questionnaires/:id', QuestionnaireController.deleteForm);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
