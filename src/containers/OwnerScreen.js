import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../App.css";
import LoadingGif from "../components/LoadingGif";
import { BASE_BACK_URI } from "../Global";
import CardOwner from "../components/CardOwner";
import ListOwner from "../components/ListOwner";
import ListPivotOwner from "../components/ListPivotOwner";
import BarAddItem from "../components/BarAddItem";
import {
  analyseHeader,
  getOwnerData,
  tabColOwner,
} from "../Helpers/ImportData";

const axios = require("axios");

const OwnerScreen = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [owner, setOwner] = useState([]);
  const [token] = useState(props.token || "");
  const { id } = useParams(); // id de l'immeuble
  const isMountedRef = useRef(null);

  const removeItem = (ownerId) => {
    const fetchData = async () => {
      try {
        await axios.post(
          BASE_BACK_URI + "/owner/delete",
          { id: ownerId, property_id: id },
          {
            headers: { Authorization: "Bearer " + props.token },
          }
        );
        // on retire l'élément supprimé de card
        const tab = owner.filter((value) => {
          return value.id !== id;
        });
        setOwner([...tab]);
      } catch (err) {
        console.log(err.message);
        alert("An error occured");
      }
    };

    if (window.confirm("Etes vous sûr de vouloir supprimer cet élément ?")) {
      fetchData();
    }
  };

  const createOwner = (colDef, data) => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        ownerData.property_id = id;
        await axios.post(BASE_BACK_URI + "/owner", ownerData, {
          headers: { Authorization: "Bearer " + props.token },
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        alert("An error occured");
      }
    };

    let ownerData = getOwnerData(colDef, data);
    if (ownerData && props.token) {
      fetchData();
    }
  };

  const handleDrag = (data) => {
    if (data && data.length > 1) {
      // la 1ère ligne est la ligne d'entête qui permet de savoir où se trouve chaque info
      const colDef = analyseHeader(tabColOwner, data[0]);
      for (let i = 1; i < data.length; i++) {
        createOwner(colDef, data[i]);
      }
    }
  };

  const editItem = (item) => {
    props.setEditPage({ name: "owner", id: id, item: item });
    history.push("/edit");
  };

  const createItem = () => {
    props.setEditPage({ name: "owner", id: id, item: {} });
    history.push("/edit");
  };

  useEffect(() => {
    isMountedRef.current = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_BACK_URI + "/owner/syndic?property_id=" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setOwner([...response.data.owner]);
      } catch (err) {
        console.log(err.message);
        alert("An error occured");
      } finally {
        setIsLoading(false);
      }
    };

    if (isMountedRef.current && token && id) {
      //if (token && id) {
      //console.log("isMountedRef : ", isMountedRef.current);
      fetchData();
    }

    return () => {
      isMountedRef.current = false;
      //console.log("unmount : ", isMountedRef.current);
    };
  }, [id, token]);

  const getItems = () => {
    if (props.showList) {
      if (props.pivotData) {
        return (
          <ListPivotOwner
            owner={owner}
            setOwner={setOwner}
            onRemove={removeItem}
            onEdit={editItem}
            createItem={createItem}
            onChangePivot={props.onChangePivot}
            handleDrag={handleDrag}
          />
        );
      } else {
        return (
          <ListOwner
            owner={owner}
            setOwner={setOwner}
            onRemove={removeItem}
            onEdit={editItem}
            createItem={createItem}
            onChangePivot={props.onChangePivot}
            handleDrag={handleDrag}
          />
        );
      }
    } else {
      return owner.map((item, index) => {
        return (
          <CardOwner
            key={index}
            item={item}
            onRemove={removeItem}
            onEdit={editItem}
            userToken={token}
            _Id={item.id}
          />
        );
      });
    }
  };

  const title = `Liste des copropriétaires ( ${owner.length} ) `;

  return (
    <section className="wrapper center">
      {isLoading ? (
        <LoadingGif title="Chargement en cours" />
      ) : (
        <>
          <BarAddItem
            onChangeMode={props.onChangeMode}
            title={title}
            onCreate={createItem}
          />
          {getItems()}
        </>
      )}
    </section>
  );
};
export default OwnerScreen;
