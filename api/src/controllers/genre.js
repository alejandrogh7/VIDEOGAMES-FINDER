const { Genre } = require("../db.js");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

const axios = require("axios");

const getGenres = async (req, res, next) => {
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
};

module.exports = {
  getGenres,
};
