import React, { useEffect, useState } from "react";
import { getGenres, getPlatforms } from "../../redux/actions/actions.js";
import { useDispatch } from "react-redux";
import FormCreate from "./FormCreate/FormCreate.jsx";
import FormGenre from "./FormGenre/FormGenre.jsx";

const VideogameForm = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    rating: 0,
    released: "",
    genre: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  if (show) {
    return (
      <FormCreate inputs={inputs} setInputs={setInputs} setShow={setShow} />
    );
  }

  if (!show) {
    return (
      <FormGenre inputs={inputs} setInputs={setInputs} setShow={setShow} />
    );
  }

  return <div>Oops!</div>;
};

export default VideogameForm;
