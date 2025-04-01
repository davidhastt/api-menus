"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_controler_1 = require("../controllers/index.controler");
//personas
router.get('/personas', index_controler_1.getUsers);
router.get('/personas/:id_persona', index_controler_1.getUserById);
router.post('/crearpersona', index_controler_1.createUser);
router.delete('/personas/:id_persona', index_controler_1.deleteUser);
router.put('/personas/:id_persona', index_controler_1.updateUser);
exports.default = router;
