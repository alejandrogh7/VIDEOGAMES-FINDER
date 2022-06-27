import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  postVideogame,
  getGenres,
  postGenre,
  getByName,
} from "../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";

const VideogameForm = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);

  const [show, setShow] = useState(true);
  const [saveId, setSaveId] = useState("");
  const [saveName, setSaveName] = useState("");

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    rating: 0,
    released: "",
    genre: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleInputsChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setSaveName(inputs.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postVideogame(inputs));
    console.log(saveName);
    dispatch(getByName(saveName));
    setInputs({
      name: "",
      description: "",
      rating: 0,
      released: "",
      genre: [],
    });
    setShow(false);
  };

  const handleInputsGenres = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      genre: [...inputs.genre, e.target.value],
    });
  };

  const handleSubmitGenres = async (e) => {
    e.preventDefault();
    await setSaveId(videogames[0].id);
    //console.log(saveId);
    inputs.genre.map(
      async (gen) => await dispatch(postGenre(videogames[0].id, gen))
    );
    setInputs({
      name: "",
      description: "",
      rating: 0,
      released: "",
      genre: [],
    });
    setShow(true);
  };

  if (show) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <NavLink to="/home">GO BACK</NavLink>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            placeholder="Game"
            onChange={(e) => handleInputsChange(e)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={inputs.description}
            placeholder="Is a wonderful game where you can explore a fantasy world and do a lot of tests"
            onChange={(e) => handleInputsChange(e)}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="range"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={inputs.rating}
            onChange={(e) => handleInputsChange(e)}
          />
          <output htmlFor="rating">{inputs.rating}</output>
        </div>
        <div>
          <label>Released: </label>
          <input
            type="date"
            name="released"
            value={inputs.released}
            onChange={(e) => handleInputsChange(e)}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    );
  }

  if (!show) {
    return (
      <form onSubmit={(e) => handleSubmitGenres(e)}>
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
          {inputs &&
            inputs.genre.map((genre) => {
              return <p>{genre + " "}</p>;
            })}
        </div>
        <input type="submit" value="Add genres" />
      </form>
    );
  }

  return <div>MOstrar</div>;
};

export default VideogameForm;
