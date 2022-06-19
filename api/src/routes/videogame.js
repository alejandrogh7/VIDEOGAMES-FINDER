const { Router } = require("express");
const {
  getAllVideoGames,
  getById,
  addVideogame,
  addGenreToVideogame,
} = require("../controllers/videogame.js");

const router = Router();

router.get("/:id", getById);

router.get("/", getAllVideoGames);

router.post("/:videoId/:genreId", addGenreToVideogame);

router.post("/", addVideogame);

module.exports = router;
