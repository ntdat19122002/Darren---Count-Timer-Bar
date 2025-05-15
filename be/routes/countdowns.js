import express from "express";
import { countdowntTimerRespository, db } from '../dabtabase/db.js'
import { getStoreByUrl } from "../services/shopifyStoreServiece.js";

const router = express.Router();

const saveMetafield = async ( store, data ) => {
    const metafieldPayload = {
      metafield: {
        namespace: 'countdown',
        key: 'settings',
        type: 'json',
        value: JSON.stringify(data),
        owner_resource: 'shop'
      }
    };

    const response = await fetch(`https://${store.store_url}/admin/api/2023-10/metafields.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': store.access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metafieldPayload),
    });
  
    const json = await response.json();
    return json;
  };

router.get("/", async (req, res) => {
    const existingStore = getStoreByUrl(req.storeUrl);
    const existingCountdown = await countdowntTimerRespository.findOne({
        where: {
            store: { id: existingStore.id }, // đảm bảo countdown thuộc store này
        },
        relations: ['store'], // cần nếu có ràng buộc quan hệ
    });
    return res.json(existingCountdown)
});

router.get("/:id", async (req, res) => {
    const existingStore = getStoreByUrl(req.storeUrl);
    const existingCountdown = await countdowntTimerRespository.findOne({
        where: {
            id: req.params.id,
            store: { id: existingStore.id }, // đảm bảo countdown thuộc store này
        },
        relations: ['store'], // cần nếu có ràng buộc quan hệ
    });
    return res.json(existingCountdown)
});

router.post("/", async (req, res) => {
    try {
        const existingStore = getStoreByUrl(req.storeUrl);
        const newCountdownTimer = countdowntTimerRespository.create({
            name: req.body.countdownTimerName,
            type: 'ok',
            setting: req.body.countdownTimerSetting,
            store: existingStore
        })
        await countdowntTimerRespository.save(newCountdownTimer)
        return res.json({ ok: req.shopifySession })
    } catch (error) {
        console.error(error.message);
        return res.status(501).json({ error: error });
    }
});

router.put("/", async (req, res) => {
    try {
        const existingStore = await getStoreByUrl(req.storeUrl);
        const existingCountdown = await countdowntTimerRespository.findOne({
            where: {
                store: { id: existingStore.id }, // đảm bảo countdown thuộc store này
            },
            relations: ['store'], // cần nếu có ràng buộc quan hệ
        });
        existingCountdown.setting = req.body.countdownTimerSetting || existingCountdown.setting;
        await countdowntTimerRespository.save(existingCountdown)
        saveMetafield(existingStore, req.body.countdownTimerSetting)
        return res.json({ ok: req.shopifySession })
    } catch (error) {
        console.error(error.message);
        return res.status(501).json({ error: error });
    }
})

export default router;
