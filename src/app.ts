import knex, { migrate, seed } from "#postgres/knex.js";
import { getRandomNum } from "#utils/genRandomRes.js";
import { retrieveIds } from './utils/sheetsGetter.js'

import cron from "node-cron";

import "#utils/sheets.js";
import { writeValues as writeValuesToSheet } from "#utils/sheets.js";

import type { WarehouseType, SheetId } from "#types/types.js";


await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

cron.schedule(
    "00 * * * *",
    async () => {
        await fetchData();
    },
    { timezone: "Europe/Moscow" },
);

async function fetchData() {
    console.log(getRandomNum().data.warehouseList[0]);
}

async function sendDataToSheets() {
    // placeholder for sheets getter from a db
    // const sheetsIds = [{spreadsheet_id:"14jRsnVBkDLNZUbvi54-5huAAXSzxi-Jrn7SkGrm4fYw"}];
    const sheetsIds: SheetId[] = await retrieveIds(knex)
    const fetchedData: WarehouseType = (getRandomNum().data.warehouseList as WarehouseType[])[0];

    const dataArr: string[] = [];
    for (const key of Object.keys(fetchedData) as (keyof WarehouseType)[]) {
        dataArr.push(fetchedData[key]);
    }

    for (const sheetId of sheetsIds) {
        writeValuesToSheet(sheetId.spreadsheet_id, dataArr);
    }
}

const res = await retrieveIds(knex)
console.log(res)