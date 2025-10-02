import knex, { migrate, seed } from "#postgres/knex.js";
import { getRandomNum } from "#utils/genRandomRes.js";

import cron from "node-cron";

import "#utils/sheets.js";
import { writeValues as writeValuesToSheet } from "#utils/sheets.js";

import type { WarehouseType } from "#types/types.js";


await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

cron.schedule(
    "* * * * *",
    async () => {
        await fetchData();
        await sendDataToSheets();
    },
    { timezone: "Europe/Moscow" },
);

async function fetchData() {
    console.log(getRandomNum().data.warehouseList[0]);
}

async function sendDataToSheets() {
    // placeholder for sheets getter from a db
    const sheetsIds = ["14jRsnVBkDLNZUbvi54-5huAAXSzxi-Jrn7SkGrm4fYw"];
    const dataObj: WarehouseType = (getRandomNum().data.warehouseList as WarehouseType[])[0];
    const dataArr: string[] = [];
    for (const key of Object.keys(dataObj) as (keyof WarehouseType)[]) {
        dataArr.push(dataObj[key]);
    }
    for (const sheetId of sheetsIds) {
        writeValuesToSheet(sheetId, dataArr);
    }
}

