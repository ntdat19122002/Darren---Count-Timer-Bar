import 'dotenv/config'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './dabtabase/db.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


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
import countdownRoutes from './routes/countdowns.js'
import verifySessionToken from './midlewares/sessionToken.js';
app.use("/shopify", shopifyRoutes);
app.use("/countdowns",verifySessionToken, countdownRoutes)

// Bắt lỗi không tìm thấy
app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
