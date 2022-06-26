import React, { useEffect, useState } from "react";
import VideogameCard from "../VideogameCard/VideogameCard.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import { getVideogames } from "../../redux/actions/actions.js";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setdataPerPage] = useState(15);
  //get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = videogames.slice(indexOfFirstData, indexOfLastData);
  const totalData = videogames.length;
  //order
  const [order, setOrder] = useState("");

  const getData = () => {
    return dispatch(getVideogames());
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
      <Pagination
        totalData={totalData}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
      />
      {currentData &&
        currentData.map((videogame) => {
          return (
            <VideogameCard
              key={videogame.id}
              id={videogame.id}
              name={videogame.name}
              image={videogame.image}
              released={videogame.released}
              rating={videogame.rating}
              genre={videogame.genres}
            />
          );
        })}
    </div>
  );
};

export default Home;
