import React, { useEffect, useState } from "react";
import VideogameCard from "../VideogameCard/VideogameCard.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import { getVideogames } from "../../redux/actions/actions.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const getData = () => {
    return dispatch(getVideogames());
  };
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  //get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = videogames.slice(indexOfFirstPost, indexOfLastPost);

  //pagination
  const totalPost = videogames.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (number) => {
    setCurrentPage(number);
  };
  return (
    <div>
      <NavBar />
      <nav>
        {pageNumbers.map((number) => (
          <li key={number}>
            <ul onClick={() => paginate(number)}>{number}</ul>
          </li>
        ))}
      </nav>
      {currentPosts &&
        currentPosts.map((videogame) => {
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
