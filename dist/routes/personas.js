"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const personas_controler_1 = require("../controllers/personas.controler");
//personas
router.get('/personas', personas_controler_1.info);
router.get('/personas/all', personas_controler_1.getUsers);
router.get('/personas/:id_persona', personas_controler_1.getUserById);
router.post('/crearpersona', personas_controler_1.createUser);
router.delete('/personas/:id_persona', personas_controler_1.deleteUser);
router.put('/personas/:id_persona', personas_controler_1.updateUser);
exports.default = router;
