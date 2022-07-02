import React from "react";
import { NavLink } from "react-router-dom";
import alerta from "../../utils/NotFound/alerta.gif";

const NotFound = () => {
  return (
    <div>
      <NavLink to="/">RE-START</NavLink>
      <img src={alerta} alt="alerta" />
    </div>
  );
};

export default NotFound;
