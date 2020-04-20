import React from "react";

const TableInventory = props => {
  // console.log("TableInventory");
  // console.log(props);

  const elements = props.distributionKey.map((item, index) => {
    return (
      <div className="trLot" key={index}>
        <input
          className="tdLot"
          type="text"
          name="codeD"
          value={item.code}
          onChange={event => {
            const value = event.target.value;
            props.updateRow(index, 1, value);
          }}
        />
        <input
          className="tdLot"
          type="text"
          name="keyD"
          value={item.key}
          onChange={event => {
            const value = event.target.value;
            props.updateRow(index, 2, value);
          }}
        />

        <input
          className="tdLot"
          type="number"
          name="tantiemeD"
          value={item.tantieme}
          onChange={event => {
            const value = event.target.value;
            props.updateRow(index, 3, value);
          }}
        />

        <div className="tdLot">
          <svg
            onClick={() => props.deleteRow(index)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
      </div>
    );
  });

  return (
    <div className="inputSelect">
      <div className="bodyLot">
        <div className="trLot">
          <div className="thLot">Lot</div>
          <div className="thLot">Clé</div>
          <div className="thLot">Tantième</div>
          <div className="tdLot">
            <svg
              onClick={() => props.addRow()}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
        </div>
        {elements}
      </div>
    </div>
  );
};
export default TableInventory;
