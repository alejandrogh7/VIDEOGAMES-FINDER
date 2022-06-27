import React, { useEffect, useState } from "react";
import {
  getByName,
  getVideogames,
  orderAsc,
  orderDesc,
  getGenres,
  getByGenre,
  filterByCreated,
  orderRatingAsc,
  orderRatingDesc,
} from "../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import girar from "../../utils/gira-a-la-derecha.svg";

const NavBar = ({ setCurrentPage, setOrder }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const handlerOnChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    dispatch(getByName(e.target.value));
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(input));
    setInput("");
  };

  const handlerOnClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
    setInput("");
  };

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleSort = (e) => {
    e.preventDefault();
    if (e.target.value === "...") return;
    if (e.target.value === "All") dispatch(getVideogames());
    if (e.target.value === "Asc") dispatch(orderAsc());
    if (e.target.value === "Desc") dispatch(orderDesc());
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.value === "...") return;
    dispatch(getByGenre(e.target.value));
  };

  const handleFilterCreated = async (e) => {
    e.preventDefault();
    //console.log([e.target.value, typeof e.target.value]);
    if (e.target.value === "...") return;
    if (e.target.value === "true") {
      await dispatch(getVideogames());
      return dispatch(filterByCreated(true));
    }
    if (e.target.value === "false") {
      await dispatch(getVideogames());
      return dispatch(filterByCreated(false));
    }
  };

  const handleRateSort = (e) => {
    e.preventDefault();
    if (e.target.value === "...") return;
    if (e.target.value === "RatingAsc") dispatch(orderRatingAsc());
    if (e.target.value === "RatingDesc") dispatch(orderRatingDesc());
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  return (
    <nav>
      <div>
        <NavLink to="/create">Create</NavLink>
      </div>
      <button onClick={(e) => handlerOnClick(e)}>
        <img src={girar} alt="re-start" width="20px" />
      </button>
      <select onClick={(e) => handleFilter(e)}>
        <option value="...">...</option>
        {genres &&
          genres.map((genre) => {
            return (
              <option value={genre.name} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
      </select>
      <select onClick={(e) => handleSort(e)}>
        <option value="...">...</option>
        <option value="All">All</option>
        <option value="Asc">Asc</option>
        <option value="Desc">Desc</option>
      </select>
      <select onClick={(e) => handleFilterCreated(e)}>
        <option value="...">...</option>
        <option value="true">Created</option>
        <option value="false">Api</option>
      </select>
      <select onClick={(e) => handleRateSort(e)}>
        <option value="...">...</option>
        <option value="RatingAsc">Rating Asc</option>
        <option value="RatingDesc">Rating Desc</option>
      </select>
      <input
        type="text"
        placeholder="Search videogame"
        value={input}
        onChange={(e) => handlerOnChange(e)}
      />
      <input
        type="submit"
        value="SEARCH"
        onSubmit={(e) => handlerOnSubmit(e)}
      />
    </nav>
  );
};

export default NavBar;
