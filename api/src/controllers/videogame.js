const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const axios = require("axios");

const getApiVideogames = async () => {
  const info1 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`
  );
  const info2 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
  );
  const info3 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`
  );
  const apiVideogames = info1.data.results.concat(
    info2.data.results,
    info3.data.results
  );
  const apiFilter = apiVideogames.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      released: videogame.released,
      rating: videogame.rating,
      platforms: videogame.platforms,
    };
  });

  return apiFilter;
};

const getAllVideoGames = async (req, res, next) => {
  const { name } = req.query;
  let videogame = [];
  try {
    const myVideogames = await Videogame.findAll({
      include: {
        model: Genre,
        as: "genres",
      },
    });
    const apiVideogames = await getApiVideogames();
    //console.log(apiVideogames.length);
    const getAllVideoGames = apiVideogames.concat(myVideogames);
    if (name) {
      videogame = getAllVideoGames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      if (videogame.length === 0) videogame = ["Game not found"];
    }

    return res
      .status(200)
      .json(videogame.length > 0 ? videogame : apiVideogames);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const videogame = uuidValidate(id)
      ? await Videogame.findByPk(id)
      : await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    return res.status(200).json(uuidValidate(id) ? videogame : videogame.data);
  } catch (error) {
    next(error);
  }
};

const addVideogame = async (req, res, next) => {
  const videogame = req.body;
  try {
    return res.status(201).json(
      await Videogame.create({
        ...videogame,
        id: uuidv4(),
      })
    );
  } catch (error) {
    next(error);
  }
};

const addGenreToVideogame = async (req, res, next) => {
  const { videoId, genreId } = req.params;
  try {
    const myVideogames = await Videogame.findByPk(videoId);
    res.status(200).json(await myVideogames.addGenre(genreId));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVideoGames,
  getById,
  addVideogame,
  addGenreToVideogame,
};
