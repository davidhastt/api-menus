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
        //insertamos la construccion    
        let respuesta = yield database_1.pool.query('INSERT INTO public.construcciones (id_persona, tema, subtema, concepto, geom) VALUES ($1, $2, $3, $4, ST_GeomFromText($5, 4326)) RETURNING public.construcciones.id_construccion', [newConstruccion.id_persona, newConstruccion.tema, newConstruccion.subtema, newConstruccion.concepto, 'POINT(' + newConstruccion.coordinates[0] + ' ' + newConstruccion.coordinates[1] + ')']);
        //insertamos el nombre de edificio
        const id_construccion = respuesta.rows[0].id_construccion; //obtenemos el ultimo id insertado
        respuesta = yield database_1.pool.query('INSERT INTO public.nombres_edificios (id_construccion, nombre) VALUES ($1, $2)', [id_construccion, newConstruccion.nombre]);
        for (const direccion of newConstruccion.direcciones) {
            respuesta = yield database_1.pool.query('INSERT INTO public.direcciones (id_construccion, direccion) VALUES ($1, $2)', [id_construccion, direccion]);
        }
        for (const corte of newConstruccion.cortes) {
            respuesta = yield database_1.pool.query('INSERT INTO public.cortes (id_construccion, año) VALUES ($1, $2)', [id_construccion, corte]);
        }
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
