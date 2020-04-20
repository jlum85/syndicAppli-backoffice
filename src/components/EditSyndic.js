import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import LoadingGif from "../components/LoadingGif";
import { BASE_BACK_URI } from "../Global";
import RowInput from "../components/RowInput";
import ValidationBar from "../components/ValidationBar";
import axios from "axios";

const EditSyndic = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [id, setId] = useState("");
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
    } else if (!phone) {
      alert("Téléphone non renseigné !!");
    } else if (!mail) {
      alert("Mail non renseigné !!");
    } else {
      result = true;
    }
    return result;
  };

  const createOrUpdateItem = () => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let route = "/syndic/create"; // creation
        let data = {
          name: name,
          address: address,
          zipCode: zipCode,
          city: city,
          phone: phone,
          mail: mail
        };
        if (id) {
          route = "/syndic/update";
          data.id = id;
        }
        await axios.post(BASE_BACK_URI + route, data, {
          headers: { Authorization: "Bearer " + props.token }
        });
        history.push("/syndic");
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
      const { name, address, zipCode, city, phone, mail } = props.item;
      setName(name);
      setAddress(address);
      setZipCode(zipCode);
      setCity(city);
      setPhone(phone);
      setMail(mail);
      setId(props.id);
    }
  }, [props]);

  const getTitle = id => {
    if (id) {
      return "Syndic";
    } else {
      return "Nouveau Syndic";
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
              name="syndicName"
              value={name}
              onChange={event => {
                const value = event.target.value;
                setName(value);
              }}
            />
            <RowInput
              label="Adresse"
              name="syndicAddress"
              value={address}
              onChange={event => {
                const value = event.target.value;
                setAddress(value);
              }}
            />
            <RowInput
              label="Code postal "
              name="syndicZip"
              value={zipCode}
              onChange={event => {
                const value = event.target.value;
                setZipCode(value);
              }}
            />
            <RowInput
              label="Ville "
              name="syndicCity"
              value={city}
              onChange={event => {
                const value = event.target.value;
                setCity(value);
              }}
            />
            <RowInput
              label="Téléphone "
              name="syndicPhone"
              value={phone}
              onChange={event => {
                const value = event.target.value;
                setPhone(value);
              }}
            />
            <RowInput
              label="Mail "
              name="syndicMail"
              value={mail}
              onChange={event => {
                const value = event.target.value;
                setMail(value);
              }}
            />
          </div>
          <ValidationBar
            setIsLoading={setIsLoading}
            valid={createOrUpdateItem}
            cancel={() => {
              history.push("/syndic");
            }}
          />
        </>
      )}
    </>
  );
};
export default EditSyndic;
