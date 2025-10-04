import { google } from "googleapis";
import { readFileSync } from "node:fs";

const creds = JSON.parse(readFileSync("keys/googleKey.json", "utf-8"));

const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

auth.authorize();

export const sheetsAuth = google.sheets({ version: "v4", auth });



