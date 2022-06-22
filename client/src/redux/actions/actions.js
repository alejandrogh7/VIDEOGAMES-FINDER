import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  GET_BY_ID,
} from "../actions-types/actions-types.js";

export const getVideogames = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/videogames/");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
};

export const postVideogame = (game) => {
  return async () => {
    const response = await axios.post(
      "http://localhost:3001/videogames/",
      game
    );
    return response;
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: response.data,
    });
  };
};
