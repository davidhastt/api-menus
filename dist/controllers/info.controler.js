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
exports.pruebaConexionDB = exports.getInfo = void 0;
const database_1 = require("../database");
const getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    return res.status(200).json({
        "mensaje": "Bienvenido, esta api contiene varios grupos de endpoints, los cuales se muestran a continuación, dale click a cada endpoint para ver mas detalles",
        "status": 200,
        "endpoints": [
            { "pruebaConexion": `${url}pruebaConexion` },
            { "personas": `${url}personas` }
        ]
    });
});
exports.getInfo = getInfo;
const pruebaConexionDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT NOW()');
        console.log("Conexion exitosa");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ "error": [`NodeJS dice ${e}`] });
    }
});
exports.pruebaConexionDB = pruebaConexionDB;
