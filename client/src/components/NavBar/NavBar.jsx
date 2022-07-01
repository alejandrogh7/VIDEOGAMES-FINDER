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
import "./NavBar.css";

const NavBar = ({ setCurrentPage, setOrder }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handlerOnChange = async (e) => {
    e.preventDefault();
    setInput(e.target.value);
    dispatch(getByName(e.target.value));
    await setCurrentPage(1);
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(input));
    setCurrentPage(1);
    setInput("");
  };

  const handlerOnClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
    setInput("");
  };

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
    <nav className="main-nav">
      <div className="button-stl">
        <NavLink to="/create" className="create_button">
          Create
        </NavLink>
      </div>
      <div>
        <button onClick={(e) => handlerOnClick(e)} className="button-style">
          <a href="#">
            <img src={girar} alt="re-start" width="20px" />
          </a>
        </button>
      </div>
      <div className="select-box">
        <select onClick={(e) => handleFilter(e)}>
          <option>...</option>
          {genres &&
            genres.map((genre) => {
              return (
                <option value={genre.name} key={genre.id}>
                  {genre.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="box">
        <select onClick={(e) => handleSort(e)}>
          <option>...</option>
          <option value="All">All</option>
          <option value="Asc">Asc</option>
          <option value="Desc">Desc</option>
        </select>
      </div>
      <div className="box">
        <select onClick={(e) => handleFilterCreated(e)}>
          <option>...</option>
          <option value="true">Created</option>
          <option value="false">Api</option>
        </select>
      </div>
      <div className="box">
        <select onClick={(e) => handleRateSort(e)}>
          <option>...</option>
          <option value="RatingAsc">Rating Asc</option>
          <option value="RatingDesc">Rating Desc</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search videogame"
          value={input}
          onChange={(e) => handlerOnChange(e)}
          className="search-nav"
        />
        <input
          type="submit"
          value="SEARCH"
          onSubmit={(e) => handlerOnSubmit(e)}
          className="submit-button"
        />
      </div>
    </nav>
  );
};

export default NavBar;
