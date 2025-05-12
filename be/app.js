import 'dotenv/config'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './dabtabase/db.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Ensure the DB is connected before starting the server
db.initialize()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });

// Route chính
import shopifyRoutes from "./routes/shopify/auth.js";
app.use("/", shopifyRoutes);

// Bắt lỗi không tìm thấy
app.use((req, res) => {
    res.status(404).send("Not Found");
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
