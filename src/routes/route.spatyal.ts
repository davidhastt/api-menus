import {Router} from 'express';
const router = Router();

import {tiendasnear} from "../controllers/spatyal.controler";
//inicio
router.get('/tiendasnear', tiendasnear);


export default router;