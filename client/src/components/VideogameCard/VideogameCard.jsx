import React from "react";
import { NavLink } from "react-router-dom";
import "./VideogameCard.css";

const VideogameCard = (props) => {
  return (
    <div className="card" key={props.id}>
      <div className="card-header">
        <img src={props.image} alt={props.name} width="300px" />
      </div>
      <div className="card-body">
        <NavLink to={`/home/${props.id}`} className="link">
          <h1>{props.name}</h1>
        </NavLink>
        <p>
          <div>Rating: {props.rating}</div>
          <div>Released: {props.released}</div>
        </p>
        {props.genre.map((genr) => {
          return (
            <h3 key={genr} className="tag tag-teal">
              {genr}
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default VideogameCard;
