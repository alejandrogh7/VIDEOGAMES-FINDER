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
  ORDER_RATING_ASC,
  ORDER_RATING_DESC,
  POST_GENRE,
  CLEAR_VIDEOGAMES,
  GET_PLATFORMS,
} from "../actions-types/actions-types.js";

export const getVideogames = () => {
  return async (dispatch) => {
    const response = await axios.get("/videogames/");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`/videogames?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
};

export const postVideogame = (game) => {
  return async () => {
    const response = await axios.post("/videogames/", game);
    return response;
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/videogames/${id}`);
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
    const response = await axios.get("/genres");
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

export const orderRatingAsc = () => {
  return {
    type: ORDER_RATING_ASC,
  };
};

export const orderRatingDesc = () => {
  return {
    type: ORDER_RATING_DESC,
  };
};

export const postGenre = (videoId, genreId) => {
  return async (dispatch) => {
    //console.log([videoId, genreId]);
    const response = await axios.post(`/videogames/${videoId}/${genreId}`);
    return dispatch({
      type: POST_GENRE,
      payload: response,
    });
  };
};

export const clearVideogames = () => {
  return {
    type: CLEAR_VIDEOGAMES,
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    const response = await axios.get("/genres/platforms/");
    return dispatch({
      type: GET_PLATFORMS,
      payload: response.data,
    });
  };
};
