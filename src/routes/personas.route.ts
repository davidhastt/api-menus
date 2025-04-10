import {Router} from 'express';
const router = Router();

import {login, personasInfo, getUsers, getUserById, createUser, deleteUser, updateUser} from "../controllers/personas.controler";
//personas
router.get('/personas', personasInfo);
router.post('/personas/crear', createUser);
router.get('/personas/all', getUsers);
router.get('/personas/:id_persona', getUserById);
router.delete('/personas/:id_persona', deleteUser);
router.put('/personas/:id_persona', updateUser)
router.post('/personas/login', login)



export default router;
