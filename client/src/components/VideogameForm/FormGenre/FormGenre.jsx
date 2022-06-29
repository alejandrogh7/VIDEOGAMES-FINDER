import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postGenre, clearVideogames } from "../../../redux/actions/actions.js";

export function validate(inputs) {
  let errors = {};
  if (!inputs.genre) {
    errors.genre = "Genre is required";
  } else if (inputs.genre.length < 2) {
    errors.genre = "Select at least three Genres";
  }

  return errors;
}

const FormGenre = ({ inputs, setShow, setInputs }) => {
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);

  const dispatch = useDispatch();
  const [saveId, setSaveId] = useState("");
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const handleInputsGenres = (e) => {
    e.preventDefault();
    setShowError(true);
    setInputs({
      ...inputs,
      genre: [...inputs.genre, e.target.value],
    });
    setErrors(
      validate({
        ...inputs,
        genre: [...inputs.genre, e.target.value],
      })
    );
    if (inputs.genre.length >= 2) {
      setShowSubmit(true);
    }
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
      {/* <div>
        <NavLink to="/home">GO HOME</NavLink>
      </div> */}
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
        {showError
          ? errors.genre && <p className="danger">{errors.genre}</p>
          : null}
      </div>
      <div>
        {inputs.genre &&
          genres.map((genre) => {
            if (inputs.genre.includes(genre.id))
              return <p key={genre.id}>{genre.name}</p>;
          })}
      </div>
      {showSubmit ? (
        <input
          type="submit"
          value="ADD GENRES"
          disabled={!(Object.entries(errors).length === 0)}
        />
      ) : null}
    </form>
  );
};

export default FormGenre;
