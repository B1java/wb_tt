import { google } from "googleapis";
import { readFileSync } from "node:fs";

const creds = JSON.parse(readFileSync("keys/googleKey.json", "utf-8"));

const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

auth.authorize();

const sheets = google.sheets({ version: "v4", auth });

async function writeValues(sheetId: string, requestData: string[]) {
    const currentDate = new Date().toLocaleString() + "(UTC + 3)";
    requestData.push(currentDate);
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "stocks_coefs!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [requestData] },
    });
    console.log("Updated!");
}

export { writeValues };
