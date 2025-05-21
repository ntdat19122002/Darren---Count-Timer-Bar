import express from "express";
import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import {db} from '../../dabtabase/db.js'
import { ShopifyStore } from "../../dabtabase/entity/ShopifyStore.js";

const router = express.Router();

// Cấu hình từ biến môi trường
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-04";
const BASE_URL = process.env.BASE_URL;
const FE_URL = process.env.FE_URL

// Phạm vi quyền cần thiết (scope)
const SCOPES = [
  "read_products",
  "write_script_tags",
  "read_orders"
];

router.get("/auth", (req, res) => {
  const shop = req.query.shop;

  if (!shop) {
    console.error("Thiếu tham số shop.");
    return res.redirect("https://rendan.website");
  }

  try {
    const redirectUri = `${BASE_URL}/shopify/finalize`;
    console.log(redirectUri);
    
    const permissionUrl = `https://${shop}/admin/oauth/authorize?` + querystring.stringify({
      client_id: SHOPIFY_API_KEY,
      scope: SCOPES.join(","),
      redirect_uri: redirectUri,
    });

    return res.redirect(permissionUrl);
  } catch (err) {
    console.error("Lỗi khi tạo permission URL:", err);
    return res.redirect("https://rendan.website");
  }
});

router.get("/finalize", async (req, res) => {
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
    
    const shopifyStoreRepository = db.getRepository(ShopifyStore)
    const existingStore = await shopifyStoreRepository.findOne({
      where: { store_url: shop },
    });

    const shopResponse = await axios.get(`https://${shop}/admin/api/${SHOPIFY_API_VERSION}/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": accessToken
      }
    });
    const shopData = shopResponse.data.shop;

    let newShopifyStore = null    
    if(!existingStore){
      newShopifyStore = shopifyStoreRepository.create({
        name: shopData.name,
        email: shopData.email,
        store_url: shop,
        primary_domain: shopData.primary_domain,
        install_status: true,
        timezone: shopData.iana_timezone,
        shopify_access_token: accessToken,
        shop_id: shopData.id,
        currency: shopData.currency,
        primary_locale: shopData.primary_locale,
        country: shopData.country,
        phone: shopData.phone,
      });
      await shopifyStoreRepository.save(newShopifyStore);
    }
    
    const redirectParams = new URLSearchParams(req.query).toString();
    res.redirect(`${FE_URL}`);
  } catch (error) {
    console.error("OAuth finalize error:", error.message);
    return res.redirect("https://nestscale.com");
  }
});

export default router;
