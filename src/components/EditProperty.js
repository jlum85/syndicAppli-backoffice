import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import LoadingGif from "../components/LoadingGif";
import RowInput from "../components/RowInput";
import ValidationBar from "../components/ValidationBar";
import TablePtyKey from "./TablePtyKey";
import { BASE_BACK_URI } from "../Global";
import axios from "axios";

const EditProperty = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [distributionKey, setDistributionKey] = useState([]);
  const [id, setId] = useState("");
  const history = useHistory();

  //console.log("EditProperty");

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
    } else {
      result = true;
    }
    return result;
  };

  const createOrUpdateItem = () => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let route = "/property/create"; // creation
        let data = {
          name: name,
          address: address,
          zipCode: zipCode,
          city: city,
          distributionKeys: distributionKey
        };
        if (id) {
          route = "/property/update";
          data.id = id;
        }
        await axios.post(BASE_BACK_URI + route, data, {
          headers: { Authorization: "Bearer " + props.token }
        });
        props.setEditPage({ name: "property", id: "", item: {} });
        history.push("/properties");
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
    if (props.id && props.item) {
      const { name, address, zip, city } = props.item;
      setName(name);
      setAddress(address);
      setZipCode(zip);
      setCity(city);
      setId(props.id);

      const result = [];
      const tab = props.item.distributionKeys;
      if (tab && tab.length > 0) {
        for (let i = 0; i < tab.length; i++) {
          let obj = {};
          obj.row = i;
          obj.keyCode = tab[i].keyCode;
          obj.keyName = tab[i].keyName;
          result.push(obj);
        }
      } else {
        result.push({ row: 0, keyCode: "001", keyName: "Charges communes" });
      }
      setDistributionKey(result);
    } else {
      setDistributionKey([
        {
          row: 0,
          keyCode: "001",
          keyName: "Charges communes"
        }
      ]);
    }
  }, [props]);

  const updateRow = (row, col, value) => {
    const result = [...distributionKey];
    for (let i = 0; i < result.length; i++) {
      if (result[i].row === row) {
        if (col === 1) {
          result[i].keyCode = value;
        } else if (col === 2) {
          result[i].keyName = value;
        }
      }
    }
    setDistributionKey(result);
  };

  const addRow = () => {
    const result = [...distributionKey];
    result.push({ row: result.length, keyCode: "", keyName: "" });
    setDistributionKey(result);
  };

  const deleteRow = row => {
    const result = distributionKey.filter(value => {
      return value.row !== row;
    });
    setDistributionKey(result);
  };

  const getTitle = id => {
    if (id) {
      // return `Id :  ${id} `;
      return "Bien en gérance";
    } else {
      return "Nouveau bien";
    }
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
              name="Name"
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
              label="Code postal "
              name="Zip"
              value={zipCode}
              onChange={event => {
                const value = event.target.value;
                setZipCode(value);
              }}
            />
            <RowInput
              label="Ville "
              name="City"
              value={city}
              onChange={event => {
                const value = event.target.value;
                setCity(value);
              }}
            />
          </div>
          <TablePtyKey
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
              history.push("/properties");
            }}
          />
        </>
      )}
    </>
  );
};
export default EditProperty;
