import connection from '../Config/db.js';

const Questionnaire = {
    // Create new entry
    create: (data, callback) => {
        const query = `
            INSERT INTO responses 
            (
            
            questionnairesno,
            schoolname,
            supervisorfname,
            collectiondate,
            age,
            staywith,
            guardianoccupation,
            otherguardianoccupation,
            guardianeducation,
            religion,
            familysize,
            oldersiblings,
            siblingshaverelationships,
            pocketmoney,
            pocketmoneyadequate,
            financialsupport,
            guardianvisits,
            othervisitors,
            accessrhinfo,
            rhinfosource,
            topicscovered,
            infoadequate
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            data.questionnairesno,
            data.schoolname,
            data.supervisorfname,
            data.collectiondate,
            data.age,
            data.staywith, 
            data.guardianoccupation,
            data.otherguardianoccupation, 
            data.guardianeducation,
            data.religion,
            data.familysize, 
            data.oldersiblings,
            data.siblingshaverelationships, 
            data.pocketmoney,
            data.pocketmoneyadequate,
            data.financialsupport, 
            data.guardianvisits,
            data.othervisitors,
            data.accessrhinfo, 
            data.rhinfosource,
            data.topicscovered,
            data.infoadequate
        ];
        
        connection.query(query, values, callback);
    },

    getAll: (limit, offset, callback) => {
        const query = 'SELECT * FROM responses ORDER BY collectiondate DESC LIMIT ? OFFSET ?';
        connection.query(query, [limit, offset], callback);
    },

    getById: (questionnairesno, callback) => {
        const query = 'SELECT * FROM responses WHERE questionnairesno = ?';
        connection.query(query, [questionnairesno], callback);
    },

    update: (questionnairesno, data, callback) => {
        const query = 'UPDATE responses SET ? WHERE questionnairesno = ?';
        connection.query(query, [data, questionnairesno], callback);
    },

    delete: (questionnairesno, callback) => {
        const query = 'DELETE FROM responses WHERE questionnairesno = ?';
        connection.query(query, [questionnairesno], callback);
    }
};

export default Questionnaire;