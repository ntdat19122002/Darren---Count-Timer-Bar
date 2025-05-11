require("dotenv").config(); 

const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./dabtabase/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Route chính
const shopifyRoutes = require("./routes/shopify/auth");
app.use("/", shopifyRoutes);

// Bắt lỗi không tìm thấy
app.use((req, res) => {
    res.status(404).send("Not Found");
  });
  

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


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
