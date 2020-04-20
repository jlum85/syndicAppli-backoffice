import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_BACK_URI } from "../Global";
import axios from "axios";
import CardSyndic from "../components/CardSyndic";
import LoadingGif from "../components/LoadingGif";
import BarAddItem from "../components/BarAddItem";

const SyndicScreen = props => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [token] = useState(props.token || "");

  const removeItem = id => {
    const fetchData = async () => {
      try {
        await axios.post(
          BASE_BACK_URI + "/syndic/delete",
          { id: id },
          {
            headers: { Authorization: "Bearer " + props.token }
          }
        );
        // on retire l'élément supprimé de card
        const tab = card.filter(value => {
          return value._id !== id;
        });
        setCard([...tab]);
      } catch (err) {
        console.log(err.message);
        alert("An error occured");
      }
    };

    if (window.confirm("Etes vous sûr de vouloir supprimer cet élément ?")) {
      fetchData();
    }
  };

  const editItem = item => {
    props.setEditPage({ name: "syndic", id: item._id, item: item });
    history.push("/edit");
  };

  const createItem = id => {
    props.setEditPage({ name: "syndic", id: "", item: {} });
    history.push("/edit");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_BACK_URI + "/syndic", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setCard(response.data);
      } catch (err) {
        console.log(err.message);
        alert("An error occured");
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const elements = card.map((item, index) => {
    return (
      <CardSyndic
        key={index}
        item={item}
        onRemove={removeItem}
        onEdit={editItem}
        userToken={token}
        userRole={props.userRole}
      />
    );
  });
  const title = `Liste des Syndic ( ${card.length} ) `;

  return (
    <section className="wrapper center">
      {isLoading ? (
        <LoadingGif title="Chargement en cours" />
      ) : (
        <>
          {props.userRole === 100 ? (
            <BarAddItem title={title} onCreate={createItem} />
          ) : (
            <BarAddItem title={title} />
          )}
          {elements}
        </>
      )}
    </section>
  );
};

export default SyndicScreen;
