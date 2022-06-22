import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getById } from "../../redux/actions/actions.js";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);
  const parser = new DOMParser();
  const document = parser.parseFromString(videogame.description, "text/html");

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <div>
      <NavLink to="/home">GO BACK</NavLink>
      <h1>{videogame.name}</h1>
      <img
        src={videogame.background_image}
        alt={videogame.name}
        width="500px"
      />
      <h2>released: {videogame.released}</h2>
      {document}
    </div>
  );
};

export default Detail;
