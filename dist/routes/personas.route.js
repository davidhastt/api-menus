"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const personas_controler_1 = require("../controllers/personas.controler");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
//personas
router.get('/personas', personas_controler_1.personasInfo);
router.post('/personas/crear', personas_controler_1.createUser);
router.get('/personas/all', auth_middlewares_1.authMiddleware, personas_controler_1.getUsers); //protegido OK
router.get('/personas/:id_persona', auth_middlewares_1.authMiddleware, personas_controler_1.getUserById); //protegido OK
router.delete('/personas/:id_persona', auth_middlewares_1.authMiddleware, personas_controler_1.deleteUser); //protegido
router.put('/personas/:id_persona', auth_middlewares_1.authMiddleware, personas_controler_1.updateUser); //protegido OK
router.post('/personas/login', personas_controler_1.login);
exports.default = router;
