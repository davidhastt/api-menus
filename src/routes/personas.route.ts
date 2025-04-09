import {Router} from 'express';
const router = Router();

import {personasInfo, getUsers, getUserById, createUser, deleteUser, updateUser} from "../controllers/personas.controler";
//personas
router.get('/personas/info', personasInfo);
router.get('/personas/', getUsers);
router.get('/personas/:id_persona', getUserById);
router.post('/crearpersona/', createUser);
router.delete('/personas/:id_persona', deleteUser);
router.put('/personas/:id_persona', updateUser)

export default router;
