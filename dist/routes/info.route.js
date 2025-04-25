"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const info_controler_1 = require("../controllers/info.controler");
const personas_controler_1 = require("../controllers/personas.controler");
const construcciones_controler_1 = require("../controllers/construcciones.controler");
//inicio
router.get('/', info_controler_1.getInfo);
router.get('/pruebaConexion', info_controler_1.pruebaConexionDB);
router.get('/personas', personas_controler_1.personasInfo);
router.post('/construcciones/', construcciones_controler_1.construccionesInfo);
exports.default = router;
