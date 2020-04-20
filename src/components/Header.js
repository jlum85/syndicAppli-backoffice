import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  return (
    <nav>
      <ul className="headerLeft">
        <li>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>{" "}
          </Link>
        </li>
        {props.userRole === 10 ? (
          <li>
            <Link to="/properties">Immeubles </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>

      <ul className="headerRight">
        <li>{props.userName}</li>
        <li
          onClick={() => {
            props.setToken(null);
            history.push("/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
          </svg>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
