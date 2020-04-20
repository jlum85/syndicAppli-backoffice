import React from "react";
import RemoveBtn from "./RemoveBtn";
import { getTantieme } from "../Helpers/Helper";

const ListOwner = props => {
  const getDetailLot = (itemOwner, isGrey) => {
    const { name, lot } = itemOwner;
    let result = [];
    let classLot = "tdLot";
    if (isGrey) {
      classLot = "tdLot rowGrey";
    }

    if (name && lot) {
      result = lot.map((item, index) => {
        return (
          <div className={isGrey ? "trLot rowGrey" : "trLot"} key={index}>
            {index === 0 ? (
              <div className="tdOwner" onClick={() => props.onEdit(itemOwner)}>
                {name}
              </div>
            ) : (
              <div className="tdOwner"></div>
            )}
            <div className={classLot}>{item.code}</div>
            <div className={classLot}>{item.key}</div>
            <div className={classLot}>{getTantieme(item.repartition)}</div>
            <div className="tdSvg">
              <RemoveBtn onRemove={props.onRemove} id={itemOwner.id} />
            </div>
          </div>
        );
      });
    }
    return result;
  };

  const elements = props.owner.map((item, index) => {
    return (
      <div className="w100p" key={index}>
        {getDetailLot(item, index % 2 !== 0)}
      </div>
    );
  });

  return (
    <div className="inputSelect">
      <div className="titleContainer">
        <h2> Répartition des lots </h2>
      </div>

      <div className="bodyLot">
        <div className="trLot rowGrey">
          <div className="thOwner">Propriétaire</div>
          <div className="thLot">Lot</div>
          <div className="thLot">Clé</div>
          <div className="thLot">Tantième</div>
          <div className="tdSvg">
            <svg
              className="svgButton"
              onClick={() => props.onChangePivot()}
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
              <g fill="none" fillRule="evenodd">
                <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
              </g>
            </svg>
          </div>
        </div>
        {elements}
      </div>
    </div>
  );
};
export default ListOwner;
