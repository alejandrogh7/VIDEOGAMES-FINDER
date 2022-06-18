const { Router } = require("express");
const { getGenres } = require("../controllers/genre.js");

const router = Router();

router.get("/", getGenres);

module.exports = router;
