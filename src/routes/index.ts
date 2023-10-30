import {Router} from 'express';
const router = Router();

import { getUsers, getUserById, createUser, deleteUser, updateUser, getInfo} from "../controllers/index.controler";

router.get('/', getInfo);
router.get('/personas', getUsers);
router.get('/personas/:id_persona', getUserById);
router.post('/crearpersona', createUser);
router.delete('/personas/:id_persona', deleteUser);
router.put('/personas/:id_persona', updateUser)


export default router;
