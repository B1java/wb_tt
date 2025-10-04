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
    "* * * * *",
    async () => {
        const fetchedData = await fetchData();
        console.log('Data fetched');
        await sendDataToSheets(knex, fetchedData);
        console.log('Data sent to sheets');
    },
    { timezone: "Europe/Moscow" },
);

cron.schedule(
    "* * * * *",
    async () => {
        const fetchedData = await fetchData();
        console.log('Data fetched #2')
        await sendDataToDb(knex, fetchedData);
    },
    { timezone: "Europe/Moscow" },
);