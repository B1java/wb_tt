/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("tariffs", (table) => {
        table.increments("id", { primaryKey: true });
        table.string("boxDeliveryBase");
        table.string("boxDeliveryCoefExpr");
        table.string("boxDeliveryLiter");
        table.string("boxDeliveryMarketplaceBase");
        table.string("boxDeliveryMarketplaceCoefExpr");
        table.string("boxDeliveryMarketplaceLiter");
        table.string("boxStorageBase");
        table.string("boxStorageCoefExpr");
        table.string("boxStorageLiter");
        table.string("geoName");
        table.string("warehouseName");
        table.string("date");
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("tariffsData");
}
