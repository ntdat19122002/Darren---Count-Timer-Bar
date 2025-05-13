import { shopifyStoreRepository } from "../dabtabase/db.js";

export async function getStoreByUrl(storeUrl){
    return await shopifyStoreRepository.findOne({
        where: { store_url: storeUrl },
    });
}