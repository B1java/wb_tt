import knex, { migrate, seed } from "#postgres/knex.js";
import { getRandomNum } from "#utils/genRandomRes.js";
import { formatTimezone } from "dateformat";
import cron from 'node-cron'

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

cron.schedule('* * * * *', async () => {
    await fetchData()
}, { timezone: 'Europe/Moscow' })

async function fetchData() {
    console.log(getRandomNum().data.warehouseList)
}