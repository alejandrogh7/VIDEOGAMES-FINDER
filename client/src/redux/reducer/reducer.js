import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  POST_VIDEOGAME,
  GET_BY_ID,
  ORDER_ASC,
  ORDER_DESC,
  GET_GENRES,
  GET_BY_GENRE,
} from "../actions-types/actions-types.js";

const initialState = {
  videogames: [],
  videogame: {},
  genres: [],
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
    case ORDER_ASC:
      let sortedAsc = state.videogames.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      return {
        ...state,
        videogames: sortedAsc,
      };
    case ORDER_DESC:
      let sortedDesc = state.videogames.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      return {
        ...state,
        videogames: sortedDesc,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_BY_GENRE:
      const filt = state.videogames.filter((game) =>
        game.genres.includes(action.payload)
      );
      return {
        ...state,
        videogames: filt,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
