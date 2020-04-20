import React from "react";

const BarAddItem = props => {
  return (
    <div className="barAddItem">
      {props.onChangeMode ? (
        <svg
          className="svgButton"
          onClick={() => props.onChangeMode()}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ) : (
        <> </>
      )}

      <p>{props.title}</p>
      <div className="actionList">
        {props.onCreate ? (
          <p className="btnAdd" onClick={() => props.onCreate()}>
            Ajouter
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default BarAddItem;
