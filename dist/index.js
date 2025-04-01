"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const info_1 = __importDefault(require("./routes/info"));
const personas_1 = __importDefault(require("./routes/personas"));
//middlewares
app.use(express_1.default.json()); //convertir datos en objetos json
app.use(express_1.default.urlencoded({ extended: false })); //convertir datos de formularios html en objetos json
app.use(personas_1.default);
app.use(info_1.default);
app.listen(4000);
console.log('NodeJS esta corriendo un api restful en el puerto 4000');
