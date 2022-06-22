import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  POST_VIDEOGAME,
  GET_BY_ID,
} from "../actions-types/actions-types.js";

const initialState = {
  videogames: [],
  videogame: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
      };
    case GET_BY_ID:
      return {
        ...state,
        videogame: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
