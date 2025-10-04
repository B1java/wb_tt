import env from "#config/env/env.js";

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    const sheetsIdArr = env.GOOGLE_SHEETS_IDS.split(",");
    const sheetsObjArr = sheetsIdArr.map((id) => {
        return { spreadsheet_id: id };
    });
    await knex("spreadsheets").insert(sheetsObjArr).onConflict(["spreadsheet_id"]).ignore();
}
