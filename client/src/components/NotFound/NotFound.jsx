import React from "react";
import { NavLink } from "react-router-dom";
import alerta from "../../utils/NotFound/alerta.gif";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <NavLink to="/" className="back">
        RE-START
      </NavLink>
      <img src={alerta} alt="alerta" width="300px" />
      <h2>PAGE NOT FOUND</h2>
      <h2 className="error">404</h2>
    </div>
  );
};

export default NotFound;
