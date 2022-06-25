import React, { useEffect, useState } from "react";
import {
  getByName,
  getVideogames,
  orderAsc,
  orderDesc,
  getGenres,
  getByGenre,
} from "../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import girar from "../../utils/gira-a-la-derecha.svg";

const NavBar = () => {
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
  }, [dispatch]);

  // const handleSort = (e) => {
  //   e.preventDefault();
  //   if (e.target.value === "All") return dispatch(getVideogames());
  //   if (e.target.value === "Asc") return dispatch(orderAsc());
  //   if (e.target.value === "Desc") return dispatch(orderDesc());
  // };

  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.value === "...") return;
    dispatch(getByGenre(e.target.value));
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
      {/* <select onClick={(e) => handleSort(e)}>
        <option value="All">All</option>
        <option value="Asc">Asc</option>
        <option value="Desc">Desc</option>
      </select> */}
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
