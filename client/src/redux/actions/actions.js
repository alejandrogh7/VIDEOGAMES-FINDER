import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  GET_BY_ID,
  ORDER_ASC,
  ORDER_DESC,
  GET_GENRES,
  GET_BY_GENRE,
  FILTER_BY_CREATED,
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

export const orderAsc = () => {
  return {
    type: ORDER_ASC,
  };
};

export const orderDesc = () => {
  return {
    type: ORDER_DESC,
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
};

export const getByGenre = (genre) => {
  return {
    type: GET_BY_GENRE,
    payload: genre,
  };
};

export const filterByCreated = (created) => {
  return {
    type: FILTER_BY_CREATED,
    payload: created,
  };
};
