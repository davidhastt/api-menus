"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.construccionesInfo = exports.nueva = void 0;
const database_1 = require("../database");
const nueva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newConstruccion = req.body;
    try {
        const response = yield database_1.pool.query('INSERT INTO public.construcciones (id_persona, tema, subtema, concepto, geom) VALUES ($1, $2, $3, $4, ST_GeomFromText($5, 4326))', [newConstruccion.id_persona, newConstruccion.tema, newConstruccion.subtema, newConstruccion.concepto, 'POINT(' + newConstruccion.coordinates[0] + ' ' + newConstruccion.coordinates[1] + ')']);
        return res.json({
            message: 'La construccion se creo satisfactoriamente',
            body: {
                construccion: {
                    newConstruccion
                }
            }
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ "error": [e] });
    }
});
exports.nueva = nueva;
const construccionesInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    //esto es lo que sale en la pagina web en formato json
    return res.status(200).json({
        "mensaje": "Bienvenido; a la sección de endpoints para personas, que son los siguientes:",
        "status": 200,
        "endpoints": [
            { "Crear una construcción": `${url}/nueva` }
        ]
    });
});
exports.construccionesInfo = construccionesInfo;
