const { Genre } = require("../db.js");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

const axios = require("axios");

const getGenres = async (req, res, next) => {
  try {
    const genres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const newGenres = genres.data.results.map((genre) => {
      const aux = genre.name;
      return aux;
    });

    const objectGenres = newGenres.map((genre) => ({
      id: uuidv4(),
      name: genre,
    }));
    await Genre.bulkCreate(objectGenres);
    return res.status(200).json(await Genre.findAll());
  } catch (error) {
    next(error);
  }
};

const getPlatformApi = async () => {
  const info1 = await axios.get(
    `https://api.rawg.io/api/platforms?key=${API_KEY}&page=1`
  );

  const platFilter = info1.data.results.map((platform) => {
    return { name: platform.name, id: uuidv4() };
  });
  return platFilter;
};

const getPlatforms = async (req, res, next) => {
  try {
    const data = await getPlatformApi();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGenres,
  getPlatforms,
};
