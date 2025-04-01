import {Router} from 'express';
const router = Router();

import {getInfo, pruebaConexionDB} from "../controllers/info.controler";
//inicio
router.get('/', getInfo);
router.get('/pruebaConexion', pruebaConexionDB);


export default router;