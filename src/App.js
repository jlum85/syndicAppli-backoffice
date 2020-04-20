import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { BASE_BACK_URI } from "./Global";
import Cookies from "js-cookie";
import axios from "axios";
import Login from "./containers/Login";
import OwnerScreen from "./containers/OwnerScreen";
import PropertyScreen from "./containers/PropertyScreen";
import SyndicScreen from "./containers/SyndicScreen";
import EditContent from "./containers/EditContent";
import Header from "./components/Header";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(0);
  const [editPage, setEditPage] = useState({
    name: "",
    id: "",
    item: {},
  });
  const [showList, setShowList] = useState(false); // false : card , true liste
  const [pivotData, setPivotData] = useState(false); // false : données en ligne , true : données pivotées par clé

  const onChangeMode = () => {
    setShowList(!showList);
  };

  const onChangePivot = () => {
    setPivotData(!pivotData);
  };

  const setToken = async (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 1 }); // expire au bout de 1 jour
    } else {
      Cookies.remove("token");
      setUserName("");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get("token");
      // chargement du user
      if (token && !userName) {
        setUserToken(token);
        try {
          const response = await axios.get(BASE_BACK_URI + "/user/" + token, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          });
          setUserName(response.data.username);
          setUserRole(Number(response.data.account.role));
        } catch (error) {
          alert("erreur axios : " + error);
        }
      }
    };

    loadUser();
  }, [userToken, userName]);

  return (
    <Router>
      {!userToken ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Header setToken={setToken} userName={userName} userRole={userRole} />
          <Switch>
            <Route path="/syndic">
              <SyndicScreen
                userName={userName}
                userRole={userRole}
                token={userToken}
                setEditPage={setEditPage}
              />
            </Route>
            <Route path="/properties">
              <PropertyScreen token={userToken} setEditPage={setEditPage} />
            </Route>
            <Route path="/owner/:id">
              <OwnerScreen
                token={userToken}
                showList={showList}
                pivotData={pivotData}
                onChangePivot={onChangePivot}
                onChangeMode={onChangeMode}
                setEditPage={setEditPage}
              />
            </Route>
            <Route path="/edit">
              <EditContent
                token={userToken}
                editPage={editPage}
                setEditPage={setEditPage}
              />
            </Route>

            <Route path="/login">
              {/* si on a déja le token pas besoin de passer par l'écran de login */}
              {userToken ? (
                <SyndicScreen
                  userName={userName}
                  userRole={userRole}
                  token={userToken}
                  setEditPage={setEditPage}
                />
              ) : (
                <Login setToken={setToken} />
              )}
            </Route>

            <Route path="/">
              {!userToken ? (
                <Redirect to="login" />
              ) : (
                <SyndicScreen
                  userName={userName}
                  userRole={userRole}
                  token={userToken}
                  setEditPage={setEditPage}
                />
              )}
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
}

export default App;
