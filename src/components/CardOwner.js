import React from "react";
import CardHeader from "./CardHeader";
import { getInventory } from "../Helpers/Helper";

const CardOwner = props => {
  const owner = props.item;

  return (
    <div className="card syndic">
      <CardHeader
        title={owner.name}
        onEdit={props.onEdit}
        onRemove={props.onRemove}
        _Id={props._Id}
        item={owner}
      />
      <div className="detail">{getInventory(owner)}</div>
    </div>
  );
};
export default CardOwner;
