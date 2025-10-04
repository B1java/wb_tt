import { getRandomNum } from "#utils/genRandomRes.js";

import type { WarehouseType } from "#types/types.js";

async function fetchData(): Promise<WarehouseType> {
    return getRandomNum().data.warehouseList[0];
}

export { fetchData }