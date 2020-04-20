import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { BASE_BACK_URI } from "../Global";
import "../App.css";
import logoSyndicAppli from "../assets/Logo1.png";

const API = BASE_BACK_URI + "/user/loginadm";

const Login = (props) => {
  const history = useHistory();
  const [mail, setMail] = useState("syndic2@privilege.com");
  const [password, setPassword] = useState("syndic2@privilege.com");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("error");

  const setError = (msgError) => {
    setMsgError(msgError);
    setIsError(true);
  };

  const checkParams = () => {
    let result = false;
    if (!password) {
      setError("Mot de passe non renseigné");
    } else {
      setMsgError("");
      setIsError(false);
      result = true;
    }
    return result;
  };

  const getLogin = async () => {
    if (checkParams()) {
      try {
        const response = await axios.post(
          API,
          { email: mail, password: password },
          { headers: { Accept: "application/json" } }
        );
        const result = response.data;
        if (result && result.token) {
          Cookies.set("token", result.token, { expires: 1 }); // expire au bout de 1 jour
          props.setToken(result.token);
          history.push("/home");
        } else {
          if (result.errorMsg === 10) {
            setError(result.message); // errorMsg  10 Invalid User Role
          } else {
            setError("Utilisateur ou mot de passe incorrect");
          }
        }
      } catch (err) {
        console.log(err);
        setError("Utilisateur ou mot de passe incorrect");
      }
    }
  };

  return (
    <section className="wrapper center">
      <form
        className="formConnect"
        onSubmit={(event) => {
          event.preventDefault();
          getLogin();
        }}
      >
        <div className="logoContainer">
          <img className="logo" src={logoSyndicAppli} alt="Logo SyndicAppli" />
        </div>

        <div className="signInput">
          <p>Email</p>
          <input
            className="inputPassword"
            type="text"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            autoComplete="on"
          />
        </div>

        <div className="signInput">
          <p>Mot de passe</p>
          <input
            className="inputPassword"
            type="password"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flexBtn">
          <p className={"error " + (isError ? "error-show" : "error-hide")}>
            {msgError}
          </p>
          <button className="signBtn">Se connecter</button>
        </div>
      </form>
    </section>
  );
};
export default Login;
