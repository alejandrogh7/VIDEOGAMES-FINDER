import React, { useState } from "react";
import { getByName, getVideogames } from "../../redux/actions/actions.js";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handlerOnChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    dispatch(getByName(e.target.value));
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getVideogames);
    setInput("");
  };

  return (
    <div>
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
    </div>
  );
};

export default NavBar;
