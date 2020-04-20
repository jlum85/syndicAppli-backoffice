import React from "react";
import EditSyndic from "../components/EditSyndic";
import EditProperty from "../components/EditProperty";
import EditOwner from "../components/EditOwner";

const EditContent = props => {
  // console.log("EditContent", props);

  const getComponent = editPage => {
    const { name, id, item } = editPage;

    if (name === "syndic") {
      return (
        <EditSyndic
          token={props.token}
          id={id}
          item={item}
          setEditPage={props.setEditPage}
        />
      );
    } else if (name === "property") {
      return (
        <EditProperty
          token={props.token}
          id={id}
          item={item}
          setEditPage={props.setEditPage}
        />
      );
    } else if (name === "owner") {
      return (
        <EditOwner
          token={props.token}
          propertyId={id}
          item={item}
          setEditPage={props.setEditPage}
        />
      );
    }
  };

  return (
    <section className="wrapper center">
      <div className="editContent">{getComponent(props.editPage)}</div>
    </section>
  );
};

export default EditContent;
