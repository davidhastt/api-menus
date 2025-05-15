import {Router} from 'express';
import {authMiddleware} from '../middlewares/auth.middlewares';
import {construccionesInfo, nueva, getConstrucciones} from "../controllers/construcciones.controler";

const router = Router();
//inicio
router.get('/construcciones', construccionesInfo)
router.get('/construcciones/all', authMiddleware, getConstrucciones)
router.post('/construcciones/nueva', authMiddleware, nueva)


export default router;