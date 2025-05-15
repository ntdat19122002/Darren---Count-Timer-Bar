import { shopifyStoreRepository } from "../dabtabase/db.js";

export async function getStoreByUrl(storeUrl){
    const store = await shopifyStoreRepository.findOne({
        where: { store_url: storeUrl },
    });
    return store
}