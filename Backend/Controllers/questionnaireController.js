import Questionnaire from '../Models/questionnaireModel.js';

export const submitForm = (req, res) => {
    // 1. Validate required custom ID
    if (!req.body.questionnaire_sno) {
        return res.status(400).json({ success: false, message: 'Questionnaire Serial Number (sno) is required' });
    }

    // 2. Validate Age (redundant to SQL check but good for UX)
    const age = parseInt(req.body.age);
    if (isNaN(age) || age < 15 || age > 19) {
        return res.status(400).json({ success: false, message: 'Age must be between 15 and 19' });
    }

    Questionnaire.create(req.body, (err, results) => {
        if (err) {
            // Handle duplicate SNO error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: 'This Serial Number already exists' });
            }
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Response saved successfully', 
            questionnaire_sno: req.body.questionnaire_sno 
        });
    });
};

export const getAllForms = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = (parseInt(req.query.page) - 1) * limit || 0;

    Questionnaire.getAll(limit, offset, (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.status(200).json({ success: true, data: results });
    });
};

export const getOneForm = (req, res) => {
    const { id } = req.params; // This will be the questionnaire_sno
    Questionnaire.getById(id, (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ success: true, data: results[0] });
    });
};

export const updateForm = (req, res) => {
    Questionnaire.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.status(200).json({ success: true, message: 'Updated successfully' });
    });
};

export const deleteForm = (req, res) => {
    Questionnaire.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    });
};