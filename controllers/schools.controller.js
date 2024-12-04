
import db from "../db/connection.js"
import  schoolSchema  from '../utils/validation.js';
import haversine  from 'haversine';

const addSchool = async (req, res) => {
    
    const { error, value } = schoolSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, address, latitude, longitude } = value;

    try {
        const [result] = await db.promise().query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
}

const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    try {
        const [schools] = await db.promise().query('SELECT * FROM schools');
        const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

        const sortedSchools = schools.map(school => {
            const schoolLocation = { latitude: school.latitude, longitude: school.longitude };
            return { ...school, distance: haversine(userLocation, schoolLocation) };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
}

export {
    addSchool,
    listSchools
}