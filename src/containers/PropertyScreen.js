import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_BACK_URI } from "../Global";
import axios from "axios";
import CardProperty from "../components/CardProperty";
import LoadingGif from "../components/LoadingGif";
import BarAddItem from "../components/BarAddItem";

const PropertyScreen = props => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState([]);
  //console.log("PropertyScreen", props);

  const removeItem = id => {
    const fetchData = async () => {
      try {
        await axios.post(
          BASE_BACK_URI + "/property/delete",
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
    props.setEditPage({ name: "property", id: item._id, item: item });
    history.push("/edit");
  };

  const createItem = id => {
    props.setEditPage({ name: "property", id: "", item: {} });
    history.push("/edit");
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("PropertyScreen fetchData");
      try {
        const response = await axios.get(BASE_BACK_URI + "/property", {
          headers: {
            Authorization: "Bearer " + props.token
          }
        });

        if (response.data) {
          setCard([...response.data]);
        } else {
          alert("an error occured 1");
        }
      } catch (err) {
        console.log(err.message);
        alert("an error occured 2 " + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (props.token) {
      fetchData();
    }
  }, [props.token]);

  const elements = card.map((item, index) => {
    return (
      <CardProperty
        key={index}
        item={item}
        onRemove={removeItem}
        onEdit={editItem}
        userToken={props.token}
        _Id={item._id}
      />
    );
  });
  const title = `Liste des biens ( ${card.length} ) `;

  return (
    <section className="wrapper center">
      {isLoading ? (
        <LoadingGif title="Chargement en cours" />
      ) : (
        <>
          <BarAddItem title={title} onCreate={createItem} />
          {elements}
        </>
      )}
    </section>
  );
};

export default PropertyScreen;
