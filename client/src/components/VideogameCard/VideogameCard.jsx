import React from "react";

const VideogameCard = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.name} width="300px" />
      <h1>{props.name}</h1>
      <h2>{props.released}</h2>
      <h2>{props.rating}</h2>
      <h3>plat</h3>
    </div>
  );
};

export default VideogameCard;
