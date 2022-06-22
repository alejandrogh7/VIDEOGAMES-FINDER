import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { postVideogame } from "../../redux/actions/actions.js";
import { useDispatch } from "react-redux";

const VideogameForm = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    rating: 0,
    released: "",
  });

  const handleInputsChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogame(inputs));
    setInputs({
      name: "",
      description: "",
      rating: 0,
      released: "",
    });
  };

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
        <output for="rating">{inputs.rating}</output>
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
};

export default VideogameForm;
