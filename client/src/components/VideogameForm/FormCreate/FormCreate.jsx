import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getByName } from "../../../redux/actions/actions.js";
import { v4 as uuidv4 } from "uuid";

//errors
export function validate(inputs) {
  let errors = {};
  //name
  if (!inputs.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z0-9_ ]{5,20}$/.test(inputs.name)) {
    errors.name = "Name is invalid";
  }
  //description
  if (!inputs.description) {
    errors.description = "Description is required";
  } else if (!/^[a-zA-Z0-9_ ]{15,200}$/.test(inputs.description)) {
    errors.description = "Description invalid";
  }

  //rating
  if (!inputs.rating) {
    errors.rating = "Rating is required";
  } else if (!/([0-5])/.test(inputs.rating)) {
    errors.rating = "Rating invalid";
  }

  //dates
  let today = new Date();
  let month = (today.getMonth() + 1).toString();
  if (month.length <= 1) month = "0" + month;
  let day = today.getDate().toString();
  if (day.length <= 1) day = "0" + day;
  today = today.getFullYear() + "-" + month + "-" + day;
  if (!inputs.released) {
    errors.released = "Realeased is required";
  } else if (today < inputs.released) {
    // !/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(
    //   inputs.released
    // )
    errors.released = "Realeased is invalid";
  }

  //platforms
  // if (!inputs.platforms) {
  //   errors.platforms = "Platform is required";
  // } else if (inputs.platforms.length < 1) {
  //   errors.platforms = "Select a platform";
  // }

  return errors;
}

const FormCreate = ({ inputs, setInputs, setShow }) => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const [saveName, setSaveName] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);

  const handleInputsChange = (e) => {
    setShowSubmit(true);
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
    setSaveName(inputs.name);
  };

  const handleInputsPlatforms = (e) => {
    e.preventDefault();
    if (e.target.value === "...") return;
    setInputs({
      ...inputs,
      platforms: [
        ...inputs.platforms,
        { platform: { id: uuidv4(), name: e.target.value } },
      ],
    });
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
      platforms: [],
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
        {errors.name && <p className="danger">{errors.name}</p>}
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
        {errors.description && <p className="danger">{errors.description}</p>}
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
        {errors.rating && <p className="danger">{errors.rating}</p>}
      </div>
      <div>
        <label>Released: </label>
        <input
          type="date"
          name="released"
          value={inputs.released}
          onChange={(e) => handleInputsChange(e)}
        />
        {errors.released && <p className="danger">{errors.released}</p>}
      </div>
      <div>
        <div>
          <label>Platforms:</label>
          <select onChange={(e) => handleInputsPlatforms(e)}>
            <option>...</option>
            {platforms &&
              platforms.map((platform) => {
                return (
                  <option value={platform.name} key={platform.id}>
                    {platform.name}
                  </option>
                );
              })}
          </select>
          {errors.platforms && <p className="danger">{errors.platforms}</p>}
        </div>
        <div>
          {/* {inputs.platforms &&
            platforms.map((platform) => {
              if (inputs.platforms.includes(platform.name))
                return <p key={platform.id}>{platform.name}</p>;
            })} */}
          {inputs.platforms &&
            inputs.platforms.map((plat) => {
              return <p key={plat.platform.name}>{plat.platform.name}</p>;
            })}
        </div>
      </div>
      {showSubmit ? (
        <input
          type="submit"
          value="Create"
          disabled={!(Object.entries(errors).length === 0)}
        />
      ) : null}
    </form>
  );
};

export default FormCreate;
