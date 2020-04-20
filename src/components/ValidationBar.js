import React from "react";
import "../App.css";

const ValidationBar = props => {
  return (
    <div className="validBar">
      <div className="btnAdd" onClick={props.valid}>
        Valider
      </div>
      <div className="btnAdd" onClick={props.cancel}>
        Annuler
      </div>
    </div>
  );
};
export default ValidationBar;
