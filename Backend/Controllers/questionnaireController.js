import Questionnaire from '../Models/questionnaireModel.js';

export const submitForm = async (req, res) => {
    // 1. Validate required custom ID

    const { questionnairesno, age } = req.body;

    if (!questionnairesno) {
        return res.status(400).json({ success: false, message: 'Questionnaire Serial Number (questionnairesno) is required' });
    }

    // 2. Validate Age (redundant to SQL check but good for UX)
    if (isNaN(age) || age < 15 || age > 19) {
        return res.status(400).json({ success: false, message: 'Age must be between 15 and 19' });
    }

    try {
        const results = await Questionnaire.create(req.body);
        res.status(201).json({ 
            success: true, 
            message: 'Response saved successfully', 
            questionnairesno: req.body.questionnairesno 
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'This Serial Number already exists' });
        }
        return res.status(500).json({ success: false, error: err.message });
    }
};

        
export const getAllForms = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = (parseInt(req.query.page) - 1) * limit || 0;

    try {
        const results = await Questionnaire.getAll(limit, offset);
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const getOneForm = async (req, res) => {
    const { id } = req.params; // This will be the questionnaire_sno
    try {
        const results = await Questionnaire.getById(id);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ success: true, data: results[0] });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
export const updateForm = async (req, res) => {
    try {
        await Questionnaire.update(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Updated successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const deleteForm = async (req, res) => {
    try {
        await Questionnaire.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};