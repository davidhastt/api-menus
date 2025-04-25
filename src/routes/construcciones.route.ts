import {Router} from 'express';
import {authMiddleware} from '../middlewares/auth.middlewares';
import {construccionesInfo, nueva} from "../controllers/construcciones.controler";

const router = Router();
//inicio
router.get('/construcciones', construccionesInfo)
router.post('/construcciones/nueva', authMiddleware, nueva)


export default router;