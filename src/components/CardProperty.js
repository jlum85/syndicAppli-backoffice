import React from "react";
import CardHeader from "./CardHeader";
import { Link } from "react-router-dom";

const CardProperty = props => {
  const item = props.item;

  return (
    <div className="card">
      <CardHeader
        title={item.name}
        onEdit={props.onEdit}
        onRemove={props.onRemove}
        _Id={props._Id}
        item={item}
      />
      <Link className="linkDetail" to={"/owner/" + props._Id}>
        <div className="detail">
          <p>{item.address}</p>
          <p>{item.street}</p>
          <p>
            {item.zip} {item.city}
          </p>
        </div>
        <div className="borderTitle" />
        <div className="ag center">
          <p className="titleCard">
            Prochaine Assemblée Générale : {item.dateAg}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default CardProperty;
