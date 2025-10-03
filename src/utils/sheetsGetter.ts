import { Knex } from "knex";
import type { SheetId } from '#types/types.js'

export async function retrieveIds(knex: Knex): Promise<SheetId[]> {
    const spreadsheetId = await knex.select("spreadsheet_id").from("spreadsheets");
    return spreadsheetId
}

