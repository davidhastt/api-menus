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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasInfo = exports.getUsers = exports.getUserById = exports.updateUser = exports.deleteUser = exports.createUser = exports.login = void 0;
const database_1 = require("../database");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import Persona from "../interfaces/persona.interface"
//no olvides ponerles try, catch
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const userResult = yield database_1.pool.query('SELECT * FROM personas WHERE correo = $1', [correo]);
        // Resto del código...
        //sino existe el usuario
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                "message": "Usuario no encontrado",
                "status": 404
            });
        }
        const user = userResult.rows[0];
        const isPasswordCorrect = yield argon2_1.default.verify(user.password, password);
        // si el password es incorrecto
        if (!isPasswordCorrect) {
            return res.status(401).json({
                "message": "Password incorrecto",
                "status": 401
            });
        }
        const payload = {
            "correo": user.correo,
            "nombre": user.nombre,
        };
        // Secret key
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret) {
            return res.status(500).json({
                "message": "Error interno del servidor, clave secreta no definida.",
                "status": 500,
            });
        }
        // Sign the token
        const token = jsonwebtoken_1.default.sign(payload, jwt_secret, {
            expiresIn: '1h'
        });
        return res.status(200).json({
            "message": "Usuario aceptado en el sistema por una hora",
            "status": 200,
            "JWT": token
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            "message": "Error interno del servidor",
            "status": 500,
            "error": "Error en el servidor"
        });
    }
});
exports.login = login;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPerson = req.body;
    newPerson.password = yield argon2_1.default.hash(newPerson.password);
    try {
        const response = yield database_1.pool.query('INSERT INTO public.personas (tipo, nombre, apaterno, amaterno, fechaNac, telefono, correo, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newPerson.tipo, newPerson.nombre, newPerson.apaterno, newPerson.amaterno, newPerson.fechaNac, newPerson.telefono, newPerson.correo, newPerson.password]);
        return res.json({
            message: 'El usario se creo satisfactoriamente',
            body: {
                user: {
                    newPerson
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ "error": ["Ocurrió un error en el servidor."] });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_persona = parseInt(req.params.id_persona);
    yield database_1.pool.query('DELETE FROM public.personas WHERE id_persona=$1', [id_persona]);
    //return res.json({"Mensaje": `La persona con id_perona =  ${id_persona} fue eliminado`});
    console.log(`La persona con id_persona = ${id_persona} fue eliminada`);
    return res.status(200).json({
        "message": "La persona con fue eliminada",
        "status": 200
    });
    //console.log(req.params.id);
    //res.send('deleting');
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //falta validar que la persona con el id recibido exista
    const person = req.body;
    person.id_persona = parseInt(req.params.id_persona);
    try {
        yield database_1.pool.query('UPDATE public.personas SET tipo = $1, nombre = $2, apaterno = $3, amaterno = $4, fechaNac = $5, telefono = $6, correo= $7 WHERE id_persona = $8', [person.tipo, person.nombre, person.apaterno, person.amaterno, person.fechaNac, person.telefono, person.correo, person.id_persona]);
        console.log(`La persona con id_perona =  ${person.id_persona} fue actualizada`);
        return res.status(200).json({
            "message": "La persona con fue actualizada",
            "status": 200
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            "message": "Error en el servidor",
            "status": 500
        });
    }
});
exports.updateUser = updateUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.params.id);
    //res.send('recived');
    const id_persona = parseInt(req.params.id_persona);
    const response = yield database_1.pool.query('SELECT * FROM public.personas WHERE id_persona = $1', [id_persona]);
    //console.log(response.rows[0]);
    const person = response.rows[0];
    //return res.json(response.rows);
    return res.status(200).json({
        "message": "Persona encontrada",
        "status": 200,
        "respuesta": person
    });
});
exports.getUserById = getUserById;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM public.personas');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ "error": ["Ocurrió un error en el servidor."] });
    }
});
exports.getUsers = getUsers;
const personasInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    //esto es lo que sale en la pagina web en formato json
    return res.status(200).json({
        "mensaje": "Bienvenido; a la sección de endpoints para personas, que son los siguientes:",
        "status": 200,
        "endpoints": [
            { "mostrar todas las personas": `${url}all` },
            { "mostrar una persona por ID": `${url}id_persona` },
            { "Crear una persona": `${url}crear` },
            { "borrar una persona": `${url}id_persona` },
            { "actualizar una persona": `${url}id_persona` }
        ]
    });
});
exports.personasInfo = personasInfo;
