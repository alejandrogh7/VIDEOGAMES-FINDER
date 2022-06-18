const { Router } = require("express");
const {
  getAllVideoGames,
  getById,
  addVideogame,
} = require("../controllers/videogame.js");

const router = Router();

router.get("/:id", getById);

router.get("/", getAllVideoGames);

router.post("/", addVideogame);

module.exports = router;
