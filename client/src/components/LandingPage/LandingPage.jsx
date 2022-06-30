import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import xbox from "../../utils/landingpage/xbox.png";
import steam from "../../utils/landingpage/steam_transparente.png";
import minecraft from "../../utils/landingpage/minecraft_transparente.png";
import playstation from "../../utils/landingpage/playstation_transparente.png";
import ea from "../../utils/landingpage/ea_transparente.png";

const LandingPage = () => {
  return (
    <section className="main-banner">
      <div className="grid-container">
        <div className="image_1">
          <img src={xbox} alt="xbox" className="image_1_style" />
        </div>
        <div className="image_2">
          <img src={steam} alt="steam" className="image_2_style" />
        </div>
        <div className="image_3">
          <img src={minecraft} alt="minecraft" className="image_3_style" />
        </div>
        <div className="image_4">
          <img src={playstation} alt="playstation" className="image_4_style" />
        </div>
        <div className="image_5">
          <img src={ea} alt="ea" className="image_5_style" />
        </div>
        <div>
          <h1 className="title">
            <span className="line-1">
              Welcome to VIDEOGAMES <strong>FINDER</strong>
            </span>
          </h1>
        </div>
        <NavLink to="/home" className="button">
          GO
        </NavLink>
      </div>
    </section>
  );
};

export default LandingPage;
