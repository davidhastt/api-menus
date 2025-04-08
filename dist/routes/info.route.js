"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const info_controler_1 = require("../controllers/info.controler");
const personas_controler_1 = require("../controllers/personas.controler");
//inicio
router.get('/', info_controler_1.getInfo);
router.get('/pruebaConexion', info_controler_1.pruebaConexionDB);
router.get('/personasInfo', personas_controler_1.personasInfo);
exports.default = router;
