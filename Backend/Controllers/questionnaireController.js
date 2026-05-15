import Questionnaire from '../Models/questionnaireModel.js';

const yesNoFields = [
    'oldersiblings',
    'siblingshaverelationships',
    'pocketmoney',
    'pocketmoneyadequate',
    'guardianvisits',
    'accessrhinfo',
    'infoadequate'
];

const normalizeYesNo = (value) => {
    if (value === 'Yes') return true;
    if (value === 'No') return false;
    return null;
};

export const submitForm = (req, res) => {
    const { questionnairesno, age } = req.body;

    if (!questionnairesno) {
        return res.status(400).json({ success: false, message: 'Questionnaire Serial Number (questionnairesno) is required' });
    }

    const parsedAge = Number(age);

    if (!Number.isInteger(parsedAge) || parsedAge < 15 || parsedAge > 19) {
        return res.status(400).json({ success: false, message: 'Age must be between 15 and 19' });
    }

    const normalizedBody = {
        ...req.body,
        age: parsedAge
    };

    yesNoFields.forEach((field) => {
        normalizedBody[field] = normalizeYesNo(req.body[field]);
    });

    Questionnaire.create(normalizedBody, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: 'This Serial Number already exists' });
            }
            return res.status(500).json({ success: false, message: 'Failed to save response', error: err.message });
        } else {
            res.status(201).json({ 
                success: true, 
                message: 'Response saved successfully', 
                id: normalizedBody.questionnairesno,
                questionnairesno: normalizedBody.questionnairesno
            });
        }
    });
};

export const getAllForms = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = (parseInt(req.query.page) - 1) * limit || 0;

    Questionnaire.getAll(limit, offset, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        } else {
            res.status(200).json({ success: true, data: results });
        }
    });
};

export const getOneForm = (req, res) => {
    const { id } = req.params; 
    
    Questionnaire.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        } else if (results.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        } else {
            res.status(200).json({ success: true, data: results[0] });
        }
    });
};

export const updateForm = (req, res) => {
    Questionnaire.update(req.params.id, req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        } else {
            res.status(200).json({ success: true, message: 'Updated successfully' });
        }
    });
};

export const deleteForm = (req, res) => {
    Questionnaire.delete(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        } else {
            res.status(200).json({ success: true, message: 'Deleted successfully' });
        }
    });
};
