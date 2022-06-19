import React, { useEffect, useState } from "react";
import VideogameCard from "../VideogameCard/VideogameCard.jsx";
import { getVideogames } from "../../redux/actions/actions.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const getData = () => {
    return dispatch(getVideogames());
  };
  useEffect(() => {
    getData();
  }, [dispatch]);
  return (
    <div>
      {videogames &&
        videogames.map((videogame) => {
          return (
            <VideogameCard
              key={videogame.id}
              id={videogame.id}
              name={videogame.name}
              image={videogame.image}
              released={videogame.released}
              rating={videogame.rating}
            />
          );
        })}
    </div>
  );
};

export default Home;
