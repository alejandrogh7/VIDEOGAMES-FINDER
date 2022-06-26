import React from "react";
import { NavLink } from "react-router-dom";

const VideogameCard = (props) => {
  return (
    <div>
      <NavLink to={`/home/${props.id}`}>
        <img src={props.image} alt={props.name} width="300px" />
        <div>
          <h1>{props.name}</h1>
        </div>
        <h2>{props.rating}</h2>
        <h3>{props.released}</h3>
        {props.genre.map((genr) => {
          return <h3>{genr}</h3>;
        })}
      </NavLink>
    </div>
  );
};

export default VideogameCard;
