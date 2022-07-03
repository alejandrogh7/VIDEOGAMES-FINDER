import React from "react";
import loader from "../../utils/Loader/rocket.png";
import "./Loader.css";
{
  /* <img src={loader} alt="rocket" width="100px" /> */
}

const Loader = () => {
  return (
    <div className="contenedor_loader">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
