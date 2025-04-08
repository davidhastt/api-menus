"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const info_route_1 = __importDefault(require("./routes/info.route"));
const personas_route_1 = __importDefault(require("./routes/personas.route"));
// Carga las variables desde el archivo .env
dotenv_1.default.config();
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json()); //convertir datos en objetos json
app.use(express_1.default.urlencoded({ extended: false })); //convertir datos de formularios html en objetos json
app.use(personas_route_1.default);
app.use(info_route_1.default);
const puerto = process.env.PORT;
app.listen(puerto);
console.log(`NodeJS esta corriendo en el puerto ${puerto}`);
