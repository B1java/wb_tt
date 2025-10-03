/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "14jRsnVBkDLNZUbvi54-5huAAXSzxi-Jrn7SkGrm4fYw" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
