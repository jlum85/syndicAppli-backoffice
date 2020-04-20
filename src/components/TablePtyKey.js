import React from "react";

const TablePtyKey = props => {
  const getItems = () => {
    if (props.distributionKey) {
      return props.distributionKey.map((item, index) => {
        return (
          <div className="trLot" key={index}>
            <input
              className="tdW50"
              type="text"
              name="codeD"
              value={item.keyCode}
              onChange={event => {
                const value = event.target.value;
                props.updateRow(index, 1, value);
              }}
            />
            <input
              className="tdLib"
              type="text"
              name="libD"
              value={item.keyName}
              onChange={event => {
                const value = event.target.value;
                props.updateRow(index, 2, value);
              }}
            />

            <div className="tdW50">
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
    }
  };

  return (
    <div className="inputSelect">
      <div className="bodyLot">
        <div className="trLot">
          <div className="thW50">Clé</div>
          <div className="thLib">Libellé</div>
          <div className="thW50">
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
        {getItems()}
      </div>
    </div>
  );
};
export default TablePtyKey;
