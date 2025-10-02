type WarehouseType = {
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    geoName: string;
    warehouseName: string;
};

type wbResponseType = {
    data: {
        dtNextBox: string;
        dtTillMax: string;
        warehouseList: WarehouseType[];
    };
};

export { wbResponseType, WarehouseType };
