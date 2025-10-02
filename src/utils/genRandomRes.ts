import { wbResponseType } from "#types/types.js";

function getRandomValue(original: string | number): string | number {
    const num = parseFloat(String(original).replace(",", "."));

    if (!isNaN(num)) {
        if (num < 1) {
            // от 0 до 1, два знака после запятой
            return Math.random().toFixed(2);
        }
        if (num >= 1 && num < 100) {
            // от 10 до 100, целое
            return Math.floor(Math.random() * 91) + 10;
        }
        if (num >= 100 && num < 1000) {
            // от 100 до 500, целое
            return Math.floor(Math.random() * 401) + 100;
        }
    }

    // если не число — вернуть как есть
    return original;
}

function randomizeData(data: any): any {
    if (Array.isArray(data)) {
        return data.map((item) => randomizeData(item));
    } else if (typeof data === "object" && data !== null) {
        const result: any = {};
        for (const key in data) {
            result[key] = randomizeData(data[key]);
        }
        return result;
    } else {
        return getRandomValue(data);
    }
}

// пример использования
const response = {
    data: {
        dtNextBox: "2024-02-01",
        dtTillMax: "2024-03-31",
        warehouseList: [
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
                geoName: "Центральный федеральный округ",
                warehouseName: "Коледино",
            },
        ],
    },
};

function getRandomNum(): wbResponseType {
    return randomizeData(response);
}

export { getRandomNum };
