const db = require('../config/db');

class School {
    
    //  Validate school details
     
    static validateSchoolData(name, address, latitude, longitude) {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return { valid: false, error: 'Invalid or missing school name' };
        }
        if (!address || typeof address !== 'string' || address.trim().length === 0) {
            return { valid: false, error: 'Invalid or missing address' };
        }
        if (latitude === undefined || longitude === undefined) {
            return { valid: false, error: 'Latitude and longitude are required' };
        }
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return { valid: false, error: 'Latitude and longitude must be numbers' };
        }
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return { valid: false, error: 'Latitude must be between -90 and 90, and longitude between -180 and 180' };
        }
        return { valid: true };
    }

    
    //  Add a new school to the database using async/await
    
    static async addSchool(name, address, latitude, longitude) {
        const validation = this.validateSchoolData(name, address, latitude, longitude);
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        try {
            const [result] = await db.promise().execute(sql, [name, address, latitude, longitude]);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    
    //   Retrieve all schools from the database using async/await
     
    static async getAllSchools() {
        const sql = 'SELECT * FROM schools';
        try {
            const [results] = await db.promise().query(sql);
            return results;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }
}

module.exports = School;
