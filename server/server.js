const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
}

// Helper function to read database
function readDB() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return { users: [] };
    }
}

// Helper function to write database
function writeDB(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing database:', error);
        return false;
    }
}

// API Routes

// Save user choice
app.post('/api/save-choice', (req, res) => {
    const { name, choice, timestamp } = req.body;

    if (!name || !choice) {
        return res.status(400).json({ error: 'Name and choice are required' });
    }

    const db = readDB();
    db.users.push({
        name,
        choice,
        timestamp: timestamp || new Date().toISOString()
    });

    if (writeDB(db)) {
        res.json({ success: true, message: 'Choice saved successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save choice' });
    }
});

// Get recent gays (users who chose option2)
app.get('/api/recent-gays', (req, res) => {
    const db = readDB();

    // Filter users who chose option2 and sort by most recent
    const gays = db.users
        .filter(user => user.choice === 'option2')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10); // Get last 10

    res.json({ gays });
});

// Get all users (for debugging)
app.get('/api/users', (req, res) => {
    const db = readDB();
    res.json(db);
});

// Clear database (for testing)
app.delete('/api/clear', (req, res) => {
    if (writeDB({ users: [] })) {
        res.json({ success: true, message: 'Database cleared' });
    } else {
        res.status(500).json({ error: 'Failed to clear database' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database file: ${DB_FILE}`);
});
