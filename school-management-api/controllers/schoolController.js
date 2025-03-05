const School = require('../models/schoolModel');

// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // 🔹 Validate input
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'All fields (name, address, latitude, longitude) are required' });
        }
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
        }

        // 🔹 Insert into database
        const result = await School.addSchool(name, address, latitude, longitude);
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });

    } catch (err) {
        console.error('Error adding school:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // 🔹 Validate input
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
        }

        // 🔹 Fetch all schools
        const schools = await School.getAllSchools();
        if (!schools.length) {
            return res.status(404).json({ message: 'No schools found' });
        }

        // 🔹 Calculate distances & sort
        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: getDistance(lat, lon, school.latitude, school.longitude)
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (err) {
        console.error('Error fetching schools:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
