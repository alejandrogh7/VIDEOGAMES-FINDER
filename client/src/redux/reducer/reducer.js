import { GET_VIDEOGAMES, GET_BY_NAME } from "../actions-types/actions-types.js";

const initialState = {
  videogames: [],
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
