import React from "react";
import loader from "../../utils/Loader/rocket.png";

const Loader = () => {
  return (
    <div>
      <img src={loader} alt="pacman" width="100px" />
      <h2>Loading...</h2>
    </div>
  );
};

export default Loader;
