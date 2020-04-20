import React from "react";
import "../App.css";

const RowInput = props => {
  return (
    <div className={props.grey ? "rowInput rowGrey" : "rowInput"}>
      <label className="labelInput" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="input"
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
export default RowInput;
