const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const axios = require("axios");

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
    const apiVideogames = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`
    );
    const getAllVideoGames = apiVideogames.data.results.concat(myVideogames);
    if (name) {
      videogame = getAllVideoGames.filter(
        (game) => game.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    return res
      .status(200)
      .json(videogame.length > 0 ? videogame : getAllVideoGames);
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

module.exports = {
  getAllVideoGames,
  getById,
  addVideogame,
};
