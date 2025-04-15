import {Router} from 'express';
const router = Router();

import {login, personasInfo, getUsers, getUserById, createUser, deleteUser, updateUser} from "../controllers/personas.controler";
import { authMiddleware } from '../middlewares/auth.middlewares';
//personas
router.get('/personas', personasInfo);
router.post('/personas/crear', createUser);
router.get('/personas/all', authMiddleware,  getUsers);//protegido OK
router.get('/personas/:id_persona', authMiddleware, getUserById); //protegido OK
router.delete('/personas/:id_persona', authMiddleware, deleteUser); //protegido
router.put('/personas/:id_persona', authMiddleware, updateUser)//protegido OK
router.post('/personas/login', login)



export default router;
