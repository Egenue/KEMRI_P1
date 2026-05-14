import connection from '../Config/db.js';

const Questionnaire = {
    // Create new entry
    create: (data, callback) => {
        const query = `
            INSERT INTO responses 
            (questionnaire_sno, school_name, supervisor_fname, collection_date, age, stay_with, 
            guardian_occupation, other_guardian_occupation, guardian_education, religion, 
            family_size, older_siblings, siblings_have_relationships, pocket_money, 
            pocket_money_adequate, financial_support, guardian_visits, other_visitors, 
            access_rh_info, rh_info_source, topics_covered, info_adequate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            data.questionnaire_sno, data.school_name, data.supervisor_fname, 
            data.collection_date || null, data.age, data.stay_with, 
            data.guardian_occupation, data.other_guardian_occupation, 
            data.guardian_education, data.religion, data.family_size, 
            data.older_siblings, data.siblings_have_relationships, 
            data.pocket_money, data.pocket_money_adequate, data.financial_support, 
            data.guardian_visits, data.other_visitors, data.access_rh_info, 
            data.rh_info_source, data.topics_covered, data.info_adequate
        ];
        
        connection.query(query, values, callback);
    },

    getAll: (limit, offset, callback) => {
        const query = 'SELECT * FROM responses ORDER BY collection_date DESC LIMIT ? OFFSET ?';
        connection.query(query, [limit, offset], callback);
    },

    getById: (sno, callback) => {
        const query = 'SELECT * FROM responses WHERE questionnaire_sno = ?';
        connection.query(query, [sno], callback);
    },

    update: (sno, data, callback) => {
        const query = 'UPDATE responses SET ? WHERE questionnaire_sno = ?';
        connection.query(query, [data, sno], callback);
    },

    delete: (sno, callback) => {
        const query = 'DELETE FROM responses WHERE questionnaire_sno = ?';
        connection.query(query, [sno], callback);
    }
};

export default Questionnaire;