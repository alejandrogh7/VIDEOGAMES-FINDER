import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>
        Welcome to VIDEOGAMES <strong>FINDER</strong>
      </h1>
      <NavLink to="/home">GO</NavLink>
    </div>
  );
};

export default LandingPage;
