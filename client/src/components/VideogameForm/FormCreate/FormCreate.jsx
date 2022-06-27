import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postVideogame, getByName } from "../../../redux/actions/actions.js";

const FormCreate = ({ inputs, setInputs, setShow }) => {
  const dispatch = useDispatch();
  const [saveName, setSaveName] = useState("");

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
    await dispatch(postVideogame(inputs));
    //console.log(saveName);
    await dispatch(getByName(saveName));
    await setInputs({
      name: "",
      description: "",
      rating: 0,
      released: "",
      genre: [],
    });
    await setShow(false);
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
          max="5"
          step="0.01"
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
};

export default FormCreate;
