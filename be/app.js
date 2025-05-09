const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./dabtabase/db');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// API to save countdown
app.post('/countdown', async (req, res) => {
    const { title, target_time } = req.body;

    if (!target_time) {
        return res.status(400).json({ error: 'target_time is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO countdown (title, target_time) VALUES ($1, $2) RETURNING *',
            [title, target_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/coutdown/setting/save', async (req, res) => {
    try {
        const result = await pool.query(
            'INSERT INTO countdown (title, target_time) VALUES ($1, $2) RETURNING *',
            [title, target_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
