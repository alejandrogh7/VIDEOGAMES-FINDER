import React, { useEffect } from "react";
import VideogameCard from "../VideogameCard/VideogameCard.jsx";
import { getVideogames } from "../../redux/actions/actions.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const getData = async () => {
    return await dispatch(getVideogames());
  };
  useEffect(() => {
    getData();
  }, [dispatch]);
  return (
    <div>
      <VideogameCard />
    </div>
  );
};

export default Home;
