const { log } = require("console");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
const querystring = require("querystring");

// Cấu hình từ biến môi trường
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-04";
const FRONTEND_URL = process.env.FRONTEND_URL ;
const BASE_URL = process.env.BASE_URL;

// Phạm vi quyền cần thiết (scope)
const SCOPES = [
  "read_products",
  "write_script_tags",
  "read_orders"
];

router.get("/shopify/auth", (req, res) => {
  console.log(1);
  
  const shop = req.query.shop;

  if (!shop) {
    console.error("Thiếu tham số shop.");
    return res.redirect("https://rendan.website");
  }

  try {
    const redirectUri = `${BASE_URL}/shopify/finalize`;

    const permissionUrl = `https://${shop}/admin/oauth/authorize?` + querystring.stringify({
      client_id: API_KEY,
      scope: SCOPES.join(","),
      redirect_uri: redirectUri,
    });

    return res.redirect(permissionUrl);
  } catch (err) {
    console.error("Lỗi khi tạo permission URL:", err);
    return res.redirect("https://rendan.website");
  }
});

router.get("/shopify/finalize", async (req, res) => {
  const { shop, hmac, code, state } = req.query;

  if (!shop || !hmac || !code) {
    console.error("Missing required parameters.");
    return res.redirect("https://nestscale.com");
  }

  // Validate HMAC
  const query = { ...req.query };
  delete query["signature"];
  delete query["hmac"];

  const message = new URLSearchParams(query).toString();
  const generatedHash = crypto
    .createHmac("sha256", SHOPIFY_API_SECRET)
    .update(message)
    .digest("hex");

  if (generatedHash !== hmac) {
    console.error("HMAC validation failed.");
    return res.status(400).send("HMAC validation failed.");
  }

  try {
    // Exchange temporary code for permanent access token
    const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    });

    const accessToken = tokenResponse.data.access_token;
    console.log(2);
    
    const redirectParams = new URLSearchParams(req.query).toString();
    res.redirect(`${FRONTEND_URL}`);
  } catch (error) {
    console.error("OAuth finalize error:", error.message);
    return res.redirect("https://nestscale.com");
  }
});

module.exports = router;
