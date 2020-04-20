import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import LoadingGif from "./LoadingGif";
import RowInput from "./RowInput";
import ValidationBar from "./ValidationBar";
import TableInventory from "./TableInventory";
import { BASE_BACK_URI } from "../Global";
import { castToNum } from "../Helpers/Helper";
import axios from "axios";

const EditOwner = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [distributionKey, setDistributionKey] = useState([]);
  const [id, setId] = useState("");
  const [mail, setMail] = useState("");
  const history = useHistory();

  const checkParam = () => {
    let result = false;
    if (!name) {
      alert("Nom non renseigné !!");
    } else if (!address) {
      alert("Adresse non renseignée !!");
    } else if (!zipCode) {
      alert("Code postal non renseigné !!");
    } else if (!city) {
      alert("Ville non renseignée !!");
    } else if (!mail) {
      alert("Mail non renseigné !!");
    } else {
      result = true;
    }
    return result;
  };

  const getLots = () => {
    let result = [];
    for (let i = 0; i < distributionKey.length; i++) {
      let obj = {};
      obj.code = distributionKey[i].code;
      obj.key = distributionKey[i].key;
      obj.repartition = [];
      // todo : revoir la gestion des kpi en saisie, en attendant on met tout sur 001
      obj.repartition.push({
        kpi: "001",
        tantieme: castToNum(distributionKey[i].tantieme)
      });
      result.push(obj);
    }
    return result;
  };

  const createOrUpdateItem = () => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let route = "/owner"; // creation
        let ownerData = {
          name: name,
          address: address,
          zipCode: zipCode,
          city: city,
          mail: mail,
          distributionKey: getLots(),
          property_id: props.propertyId
        };
        if (id) {
          // update
          route = "/owner/update";
          ownerData.id = id;
        }
        await axios.post(BASE_BACK_URI + route, ownerData, {
          headers: { Authorization: "Bearer " + props.token }
        });
        props.setEditPage({ name: "owner", id: "", item: {} });
        history.push("/owner/" + props.propertyId);
      } catch (err) {
        console.log(err.message);
        alert("An error occured");
      }
    };

    if (props.token && checkParam()) {
      fetchData();
    }
  };

  useEffect(() => {
    if (props.item && props.item.id) {
      const { id, name, address, zipCode, city, mail2, lot } = props.item;
      setId(id);
      setName(name);
      setAddress(address);
      setZipCode(zipCode);
      setCity(city);
      setMail(mail2);

      const result = [];
      if (lot && lot.length > 0) {
        for (let i = 0; i < lot.length; i++) {
          let obj = {};
          obj.row = i;
          obj.code = lot[i].code;
          obj.key = lot[i].key;
          obj.tantieme = getTantieme(lot[i].repartition);
          result.push(obj);
        }
      } else {
        result.push({ row: 0, code: "0023", key: "001", tantieme: 0 });
      }
      setDistributionKey(result);
    } else {
      setDistributionKey([{ row: 0, code: "0023", key: "001", tantieme: 0 }]);
    }
  }, [props]);

  const getTitle = id => {
    if (id) {
      return "Copropriétaire";
    } else {
      return "Nouveau copropriétaire";
    }
  };

  const getTantieme = repartition => {
    let result = 0;
    if (repartition) {
      result = repartition.reduce((acc, currValue) => {
        return acc + currValue.tantieme;
      }, 0);
    }
    return result;
  };
  const updateRow = (row, col, value) => {
    const result = [...distributionKey];
    for (let i = 0; i < result.length; i++) {
      if (result[i].row === row) {
        if (col === 1) {
          result[i].code = value;
        } else if (col === 2) {
          result[i].key = value;
        } else if (col === 3) {
          result[i].tantieme = value;
        }
      }
    }
    setDistributionKey(result);
  };

  const addRow = () => {
    const result = [...distributionKey];
    if (result.length === 0) {
      result.push({ row: 0, code: "00XX", key: "001" });
    } else {
      result.push({ row: result.length, code: "", key: "", tantieme: 0 });
    }
    setDistributionKey(result);
  };

  const deleteRow = row => {
    const result = distributionKey.filter(value => {
      return value.row !== row;
    });
    setDistributionKey([...result]);
  };

  return (
    <>
      {isLoading ? (
        <LoadingGif title="Traitement en cours" />
      ) : (
        <>
          <h2>{getTitle(id)}</h2>
          <div className="inputSelect">
            <RowInput
              label="Nom"
              name="name"
              value={name}
              onChange={event => {
                const value = event.target.value;
                setName(value);
              }}
            />
            <RowInput
              label="Adresse"
              name="Address"
              value={address}
              onChange={event => {
                const value = event.target.value;
                setAddress(value);
              }}
            />
            <RowInput
              label="Code postal"
              name="zipCodeOwner"
              value={zipCode}
              onChange={event => {
                const value = event.target.value;
                setZipCode(value);
              }}
            />
            <RowInput
              label="Ville "
              name="city"
              value={city}
              onChange={event => {
                const value = event.target.value;
                setCity(value);
              }}
            />
            <RowInput
              label="Mail "
              name="mail"
              value={mail}
              onChange={event => {
                const value = event.target.value;
                setMail(value);
              }}
            />
          </div>
          <TableInventory
            distributionKey={distributionKey}
            setDistributionKey={setDistributionKey}
            updateRow={updateRow}
            addRow={addRow}
            deleteRow={deleteRow}
          />
          <ValidationBar
            setIsLoading={setIsLoading}
            valid={createOrUpdateItem}
            cancel={() => {
              history.push("/owner/" + props.propertyId);
            }}
          />
        </>
      )}
    </>
  );
};
export default EditOwner;
