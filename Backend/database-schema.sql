-- Create questionnaires table
-- Run this SQL in your Railway database to set up the table

CREATE TABLE IF NOT EXISTS questionnaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serialNumber VARCHAR(100),
    schoolName VARCHAR(255),
    supervisorName VARCHAR(255),
    dateCollection DATE,
    age INT,
    stayWith VARCHAR(100),
    guardianOccupation VARCHAR(100),
    guardianEducation VARCHAR(100),
    religion VARCHAR(100),
    familySize INT,
    olderSiblings VARCHAR(10),
    siblingsPartnered VARCHAR(10),
    parentsPocketMoney VARCHAR(10),
    pocketMoneyAdequate VARCHAR(10),
    guardianVisits VARCHAR(10),
    reproductiveHealthAccess VARCHAR(10),
    informationAdequate VARCHAR(10),
    formDataJson LONGTEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date (dateCollection),
    INDEX idx_school (schoolName)
);

-- Insert sample questionnaire (optional)
INSERT INTO questionnaires 
(serialNumber, schoolName, supervisorName, dateCollection, age, stayWith, guardianOccupation, religion, familySize)
VALUES 
('Q-001', 'Sample School', 'John Doe', '2024-05-13', 17, 'Father and mother', 'Employed by someone', 'Protestant', 5);
