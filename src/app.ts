import "#utils/sheets/authentication.js";
import knex, { migrate, seed } from "#postgres/knex.js";

import cron from "node-cron";

import { fetchData } from "#utils/wb/fetchApi.js";
import { sendDataToDb } from "#utils/db/dbData.js";
import { sendDataToSheets } from "#utils/sheets/remoteSheets.js";

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");


cron.schedule(
    "00 23 * * *",
    async () => {
        const fetchedData = await fetchData();
        await sendDataToSheets(knex, fetchedData);
    },
    { timezone: "Europe/Moscow" },
);

cron.schedule(
    "00s * * * *",
    async () => {
        const fetchedData = await fetchData();
        await sendDataToDb(knex, fetchedData);
    },
    { timezone: "Europe/Moscow" },
);