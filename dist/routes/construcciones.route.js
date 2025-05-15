"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const construcciones_controler_1 = require("../controllers/construcciones.controler");
const router = (0, express_1.Router)();
//inicio
router.get('/construcciones', construcciones_controler_1.construccionesInfo);
router.get('/construcciones/all', auth_middlewares_1.authMiddleware, construcciones_controler_1.getConstrucciones);
router.post('/construcciones/nueva', auth_middlewares_1.authMiddleware, construcciones_controler_1.nueva);
exports.default = router;
