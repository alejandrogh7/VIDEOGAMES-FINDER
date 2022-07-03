import React, { useEffect, useState } from "react";
import VideogameCard from "../VideogameCard/VideogameCard.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import { getVideogames } from "../../redux/actions/actions.js";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination.jsx";
import "./Home.css";
import Loader from "../Loader/Loader.jsx";

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

  // const getData = () => {
  //   return dispatch(getVideogames());
  // };
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className="home">
      <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
      <Pagination
        totalData={totalData}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="gc">
        <div className="container">
          {currentData &&
          videogames.length > 0 &&
          typeof videogames === "object" ? (
            currentData.map((videogame) => {
              return (
                <VideogameCard
                  key={videogame.id}
                  id={videogame.id}
                  name={videogame.name}
                  image={videogame.image}
                  released={videogame.released}
                  rating={videogame.rating}
                  genre={videogame.genres.map((genre) => genre.name)}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
