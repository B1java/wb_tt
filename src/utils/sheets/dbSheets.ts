import { Knex } from "knex";
import type { SheetId } from '#types/types.js'

async function retrieveIds(knex: Knex): Promise<SheetId[]> {
    const spreadsheetId = await knex.select("spreadsheet_id").from("spreadsheets");
    return spreadsheetId
}

async function addNewId(knex: Knex, spreadsheetId: string): Promise<void> {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: spreadsheetId }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}


export const sheet = {
    getId: async (knex: Knex) =>
        await retrieveIds(knex),
    addId: async (knex: Knex, spreadsheetId: string) =>
        addNewId(knex, spreadsheetId)
}