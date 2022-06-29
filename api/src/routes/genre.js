const { Router } = require("express");
const { getGenres, getPlatforms } = require("../controllers/genre.js");

const router = Router();

router.get("/", getGenres);

router.get("/platforms", getPlatforms);

module.exports = router;
