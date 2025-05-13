import express from "express";
import { countdowntTimerRespository, db } from '../dabtabase/db.js'
import { getStoreByUrl } from "../services/shopifyStoreServiece.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const existingStore = getStoreByUrl(req.storeUrl);
    const existingCountdown = await countdowntTimerRespository.findOne({
        where: {
            id: req.body.countdownTimerId,
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
        const existingStore = getStoreByUrl(req.storeUrl);
        const existingCountdown = await countdowntTimerRespository.findOne({
            where: {
                id: req.body.countdownTimerId,
                store: { id: existingStore.id }, // đảm bảo countdown thuộc store này
            },
            relations: ['store'], // cần nếu có ràng buộc quan hệ
        });
        existingCountdown.setting = req.body.countdownTimerSetting || existingCountdown.setting;
        await countdowntTimerRespository.save(existingCountdown)
        return res.json({ ok: req.shopifySession })
    } catch (error) {
        console.error(error.message);
        return res.status(501).json({ error: error });
    }
})

export default router;
