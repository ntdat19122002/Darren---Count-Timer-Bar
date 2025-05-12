import express from "express";
import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import {db} from '../../dabtabase/db.js'
import { ShopifyStore } from "../../dabtabase/entity/ShopifyStore.js";


const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL ;
const BASE_URL = process.env.BASE_URL;

router.get("/coutdowns", (req, res) => {
    
});

router.put("/coutdowns/", async (req, res) => {
    
});

export default router;
