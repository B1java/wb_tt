import type { Knex } from "knex";
import type { WarehouseType } from "#types/types.js";

import { lastDateIsSame } from "./utils.js";

async function getLastRowDate(knex: Knex) {
    const lastRow = await knex
        .select(['id', 'date'])
        .from('tariffs')
        .orderBy('id', 'desc')
        .first()


    return lastRow
}

async function sendDataToDb(knex: Knex, data: WarehouseType) {
    const { id, date } = await getLastRowDate(knex)
    const dataObj = {
        ...data,
        date: (new Date).toString(),
    }
    if (lastDateIsSame(date)) {
        await knex('tariffs')
            .where('id', id)
            .update({
                id: id,
                ...dataObj,
            })
        console.log('Data replaced')
    } else {
        await knex('tariffs')
            .insert([{ ...dataObj }])
        console.log('Data inserted')
    }
}

export { sendDataToDb }; 