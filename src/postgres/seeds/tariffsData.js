/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("tariffs")
        .insert([
            {
                boxDeliveryBase: "48",
                boxDeliveryCoefExpr: "160",
                boxDeliveryLiter: "11,2",
                boxDeliveryMarketplaceBase: "40",
                boxDeliveryMarketplaceCoefExpr: "125",
                boxDeliveryMarketplaceLiter: "11",
                boxStorageBase: "0,14",
                boxStorageCoefExpr: "115",
                boxStorageLiter: "0,07",
                geoName: "testGeo",
                warehouseName: "testWarehouse",
                date: new Date().toString(),
            },
        ])
        .onConflict(["id"])
        .ignore();
}
