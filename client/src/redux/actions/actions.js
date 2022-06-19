import axios from "axios";
import { GET_VIDEOGAMES } from "../actions-types/actions-types.js";

export const getVideogames = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/videogames/");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
};
