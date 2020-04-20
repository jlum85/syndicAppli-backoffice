import { castToNum } from "./Helper";

const listColOwner =
  "name;address;zipCode;city;mail;lot1;key1;val1;lot2;key2;val2";

export const tabColOwner = listColOwner.split(";");

export const extractData = (colDef, data) => {
  if (colDef && colDef.length > 0 && data && data.length > 0) {
    // pour chaque item.name de colDef , on renvoi sa valeur dans data en fonction de son indice item.column
    // { name: "Lumineau", address: "29 avenue Gambetta", ...}
    let result = {};

    colDef.forEach((item) => (result[item.name] = data[item.column]));
    return result;
  }
};

export const analyseHeader = (col, header) => {
  if (col && col.length > 0 && header && header.length > 0) {
    // pour chaque élément de listCol , on renvoi sa position dans le tableau header
    return col.map((value) => {
      return {
        name: value,
        column: header.findIndex((element) => element === value),
      };
    });
  }
};

export const getOwnerData = (colDef, data) => {
  let {
    name,
    address,
    zipCode,
    city,
    mail,
    lot1,
    key1,
    val1,
    lot2,
    key2,
    val2,
  } = extractData(colDef, data);
  // toutes les colonnes doivent être alimentées sauf lot2, key2, val2
  const checkErr =
    !name || !address || !zipCode || !city || !mail || !lot1 || !key1 || !val1;
  if (!checkErr) {
    let distributionKey = [
      {
        code: lot1,
        key: key1,
        repartition: [{ kpi: "001", tantieme: castToNum(val1) }],
      },
    ];
    if (lot2 && key2 && val2) {
      distributionKey.push({
        code: lot2,
        key: key2,
        repartition: [{ kpi: "001", tantieme: castToNum(val2) }],
      });
    }

    return {
      name: name,
      address: address,
      zipCode: zipCode,
      city: city,
      mail: mail,
      distributionKey: distributionKey,
    };
  }
};
