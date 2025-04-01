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
exports.tiendasnear = void 0;
const database_1 = require("../database");
const tiendasnear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'SELECT *' +
        'FROM tiendas ' +
        'INNER JOIN ubicaciones ' +
        'ON tiendas.id_tienda =ubicaciones.id_tp ' +
        'WHERE ST_DWithin(ubicaciones.xy, ST_SetSRID(ST_MakePoint(-99.67688542843177, 19.28662076007736), 4326), 0.10);';
    try {
        const response = yield database_1.pool.query(query);
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ "error": [`NodeJS dice ${e}`] });
    }
});
exports.tiendasnear = tiendasnear;
