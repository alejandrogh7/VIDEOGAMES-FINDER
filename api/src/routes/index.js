const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRouter = require("./videogame.js");
const GenreRouter = require("./genre.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", VideogamesRouter);

router.use("/genres", GenreRouter);

module.exports = router;
