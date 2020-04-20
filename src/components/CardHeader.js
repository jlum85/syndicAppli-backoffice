import React from "react";
import RemoveBtn from "./RemoveBtn";

const CardHeader = props => {
  return (
    <div className="title">
      <p>{props.title}</p>
      <div className="actionList">
        {props.onEdit ? (
          <svg
            className="svgButton"
            onClick={() => props.onEdit(props.item)}
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
          </svg>
        ) : (
          <></>
        )}
        {props.onRemove ? (
          <RemoveBtn onRemove={props.onRemove} id={props._Id} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default CardHeader;
