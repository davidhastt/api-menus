import {Router} from 'express';
const router = Router();

import {info, getUsers, getUserById, createUser, deleteUser, updateUser} from "../controllers/personas.controler";
//personas
router.get('/personas', info);
router.get('/personas/all', getUsers);
router.get('/personas/:id_persona', getUserById);
router.post('/crearpersona', createUser);
router.delete('/personas/:id_persona', deleteUser);
router.put('/personas/:id_persona', updateUser)

export default router;
