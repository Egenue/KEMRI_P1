CREATE TABLE IF NOT EXISTS responses (
    questionnairesno VARCHAR(100) PRIMARY KEY,
    schoolname VARCHAR(255) NOT NULL,
    supervisorfname VARCHAR(255),
    collectiondate DATE,
    age INT NOT NULL,
    staywith VARCHAR(100),
    guardianoccupation VARCHAR(100),
    otherguardianoccupation VARCHAR(255),
    guardianeducation VARCHAR(100),
    religion VARCHAR(100),
    familysize INT,
    oldersiblings BOOLEAN,
    siblingshaverelationships BOOLEAN,
    pocketmoney BOOLEAN,
    pocketmoneyadequate BOOLEAN,
    financialsupport TEXT,
    guardianvisits BOOLEAN,
    othervisitors TEXT,
    accessrhinfo BOOLEAN,
    rhinfosource TEXT,
    topicscovered TEXT,
    infoadequate BOOLEAN,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_collectiondate (collectiondate),
    INDEX idx_schoolname (schoolname)
);

INSERT INTO responses
(questionnairesno, schoolname, supervisorfname, collectiondate, age, staywith, guardianoccupation, religion, familysize)
VALUES
('KEMRI-SAMPLE-001', 'Sample School', 'John Doe', '2024-05-13', 17, 'Father and mother', 'Employed by someone', 'Protestant', 5);
