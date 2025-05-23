import {Router} from 'express';
const router = Router();

import {getInfo, pruebaConexionDB} from "../controllers/info.controler";
import {personasInfo} from "../controllers/personas.controler";
import {construccionesInfo} from "../controllers/construcciones.controler";


//inicio
router.get('/', getInfo);
router.get('/pruebaConexion', pruebaConexionDB);
router.get('/personas', personasInfo);
router.post('/construcciones/', construccionesInfo);




export default router;