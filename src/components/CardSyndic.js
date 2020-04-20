import React from "react";
import CardHeader from "./CardHeader";
import { Link } from "react-router-dom";

const CardSyndic = props => {
  const item = props.item;

  return (
    <div className="card syndic">
      {props.userRole === 100 ? (
        <>
          <CardHeader
            title={item.name}
            onEdit={props.onEdit}
            onRemove={props.onRemove}
            item={item}
            _Id={item._id}
          />
          <div className="detail">
            <p>{item.street}</p>
            <p>
              {item.city} {item.zipCode}
            </p>
            <p>{item.mail}</p>
          </div>
        </>
      ) : (
        <>
          <CardHeader title={item.name} onEdit={props.onEdit} item={item} />
          <Link className="linkDetail" to={"properties/" + item._id}>
            <div className="detail">
              <p>{item.street}</p>
              <p>
                {item.city} {item.zipCode}
              </p>
              <p>{item.mail}</p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
export default CardSyndic;
