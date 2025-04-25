"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const construcciones_controler_1 = require("../controllers/construcciones.controler");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = (0, express_1.Router)();
//inicio
router.post('/construcciones/nueva', auth_middlewares_1.authMiddleware, construcciones_controler_1.nuevaConstruccion);
exports.default = router;
