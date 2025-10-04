import env from "#config/env/env.js";

import type { WarehouseType } from "#types/types.js";

async function fetchData(): Promise<WarehouseType> {
    const response = await fetch('https://common-api.wildberries.ru/api/v1/tariffs/box', {
        method: 'GET',
        headers: {
            'HeaderApiKey': env.WB_APIKEY,
        }
    })

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    return data
}


export { fetchData }