import React from "react";

// protection des calculs avec conversion montant formaté en nombre
export const castToNum = value => {
  if (value && typeof value === "string") {
    return parseInt(value.replace(/\D/g, "")); // on enlève tous les caractères non numériques
  } else if (value && typeof value === "number") {
    return value;
  } else {
    return 0;
  }
};

export const getTantieme = repartition => {
  let result = 0;
  if (repartition) {
    result = repartition.reduce((acc, currValue) => {
      return acc + castToNum(currValue.tantieme);
    }, 0);
  }
  return result;
};

export const getInventory = owner => {
  let result = [];
  if (owner.lot) {
    result = owner.lot.map((item, index) => {
      return (
        <div key={index}>
          <p>
            Lot : {item.code} - Clé : {item.key} - Tantième :{" "}
            {getTantieme(item.repartition)}
          </p>
        </div>
      );
    });
  }
  return result;
};
