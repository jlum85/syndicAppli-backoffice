import React from "react";
import RemoveBtn from "./RemoveBtn";
import CSVReader from "react-csv-reader";
import { getTantieme } from "../Helpers/Helper";

const ListPivotOwner = props => {
  // console.log("ListPivotOwner props");
  // console.log(props);

  const getListKey = owner => {
    let result = [];
    if (owner && owner.length > 0) {
      for (let i = 0; i < owner.length; i++) {
        const lot = owner[i].lot;
        if (lot && lot.length > 0) {
          for (let j = 0; j < lot.length; j++) {
            if (!result.includes(lot[j].key)) {
              result.push(lot[j].key);
            }
          }
        }
      }
    }
    return result.sort();
  };

  // todo : récupérer l'info qui vient de distributionKey de la collection property
  const getLibKey = codeKey => {
    if (codeKey === "001") {
      return "Charges communes";
    } else if (codeKey === "003") {
      return "Charges Batiment A";
    } else if (codeKey === "004") {
      return "Charges Batiment B";
    } else {
      return "Clé " + codeKey;
    }
  };

  const getListColKey = owner => {
    let key = [];
    for (let i = 0; i < owner.length; i++) {
      const lot = owner[i].lot;
      if (lot && lot.length > 0) {
        for (let j = 0; j < lot.length; j++) {
          if (!key.includes(lot[j].key)) {
            key.push(lot[j].key);
          }
        }
      }
    }
    let col = key.sort();
    return col.map((item, index) => {
      return (
        <div key={index} className="thLib">
          {getLibKey(item)}
        </div>
      );
    });
  };

  const getValue = (keyCode, lot) => {
    if (lot) {
      for (let i = 0; i < lot.length; i++) {
        if (lot[i].key === keyCode) {
          return getTantieme(lot[i].repartition);
        }
      }
      return 0;
    } else {
      return 0;
    }
  };

  const getDetailLot = (keys, item, index) => {
    const { name, lot } = item;
    const isGrey = index % 2 !== 0; // pour alterner les couleurs
    let elements = keys.map((item, idx) => {
      return (
        <div className={isGrey ? "tdValue rowGrey" : "tdValue"} key={idx}>
          {getValue(item, lot)}
        </div>
      );
    });

    return (
      <div className={isGrey ? "trLot rowGrey" : "trLot"} key={index}>
        <div className="tdOwner" onClick={() => props.onEdit(item)}>
          {name}
        </div>
        {elements}
        <div className="tdLot">
          <RemoveBtn onRemove={props.onRemove} id={item.id} />
        </div>
      </div>
    );
  };

  const getItems = owner => {
    if (owner) {
      const keys = getListKey(owner);
      return owner.map((item, index) => {
        return (
          <div className="w100p" key={index}>
            {getDetailLot(keys, item, index)}
          </div>
        );
      });
    }
  };

  const getSum = (owner, key) => {
    let result = 0;
    if (owner && owner.length > 0) {
      for (let i = 0; i < owner.length; i++) {
        const lot = owner[i].lot;
        if (lot && lot.length > 0) {
          for (let n = 0; n < lot.length; n++) {
            if (lot[n].key === key) {
              result += getTantieme(lot[n].repartition);
            }
          }
        }
      }
    }
    return Number(result).toLocaleString();
  };

  const getTotal = owner => {
    if (owner) {
      const keys = getListKey(owner);
      return keys.map((item, index) => {
        return (
          <div className="thSum" key={index}>
            {getSum(owner, item)}
          </div>
        );
      });
    }
  };

  return (
    <div className="inputSelect">
      <div className="titleContainer">
        <h2> Répartition des tantièmes par clé analytique </h2>
        {props.handleDrag ? (
          <CSVReader
            cssClass="csv-reader-input"
            onFileLoaded={props.handleDrag}
            inputId="ObiWan"
          />
        ) : (
          <></>
        )}
      </div>

      <div className="bodyLot">
        <div className="trLot rowGrey bs">
          <div className="thOwner">Propriétaire</div>
          {getListColKey(props.owner)}
          <div className="tdLot">
            <svg
              onClick={() => props.onChangePivot()}
              className="tdSvg"
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 2.1l4 4-4 4" />
              <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
              <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
            </svg>
          </div>
        </div>
        {getItems(props.owner)}

        <div className="trLot heightTotal">
          <div className="thOwner">Total par clé</div>
          {getTotal(props.owner)}
          <div className="tdLot"></div>
        </div>
      </div>
    </div>
  );
};
export default ListPivotOwner;
