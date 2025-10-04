import { sheetsAuth } from "./authentication.js";
import { sheet } from "./dbSheets.js";
import { sendDataToDb } from "#utils/db/dbData.js";
import { fetchData } from "#utils/wb/fetchApi.js";
import { getRandomNum } from "#utils/genRandomRes.js";

import type { WarehouseType, SheetId } from "#types/types.js";
import { Knex } from "knex";


async function writeValues(sheetId: string, requestData: string[]) {
    const currentDate = new Date().toLocaleString() + "(UTC + 3)";
    requestData.push(currentDate);
    await sheetsAuth.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "stocks_coefs!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [requestData] },
    });
}

async function sendDataToSheets(knex: Knex, fetchedData: WarehouseType): Promise<void> {
    // [{spreadsheet_id:"14jRsnVBkDLNZUbvi54-5huAAXSzxi-Jrn7SkGrm4fYw"}]
    const sheetsIds: SheetId[] = await sheet.getId(knex)

    const dataArr: string[] = [];
    for (const key of Object.keys(fetchedData) as (keyof WarehouseType)[]) {
        dataArr.push(fetchedData[key]);
    }

    for (const sheetId of sheetsIds) {
        writeValues(sheetId.spreadsheet_id, dataArr);
    }
}



export { sendDataToSheets }