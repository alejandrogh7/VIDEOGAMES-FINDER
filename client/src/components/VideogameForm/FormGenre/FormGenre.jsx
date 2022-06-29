import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postGenre, clearVideogames } from "../../../redux/actions/actions.js";

const FormGenre = ({ inputs, setShow, setInputs }) => {
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);

  const dispatch = useDispatch();
  const [saveId, setSaveId] = useState("");

  const handleInputsGenres = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      genre: [...inputs.genre, e.target.value],
    });
  };

  const handleSubmitGenresPlatforms = async (e) => {
    e.preventDefault();
    setSaveId(videogames[0].id);

    inputs.genre.map(
      async (gen) => await dispatch(postGenre(videogames[0].id, gen))
    );
    await dispatch(clearVideogames());
    setInputs({
      name: "",
      description: "",
      rating: 0,
      released: "",
      genre: [],
      platforms: [],
    });
    setShow(true);
  };

  return (
    <form onSubmit={(e) => handleSubmitGenresPlatforms(e)}>
      <div>
        <NavLink to="/home">GO HOME</NavLink>
      </div>
      <div>
        <label>Add genres:</label>
        <select onChange={(e) => handleInputsGenres(e)}>
          <option>...</option>
          {genres &&
            genres.map((genre) => {
              return (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        {inputs.genre &&
          genres.map((genre) => {
            if (inputs.genre.includes(genre.id))
              return <p key={genre.id}>{genre.name}</p>;
          })}
      </div>
      <input type="submit" value="ADD GENRES" />
    </form>
  );
};

export default FormGenre;
