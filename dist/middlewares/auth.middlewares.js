"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    //const token = req.headers.authorization?.split(" ")[1]; // Extraer token del encabezado
    const token = req.header("Authorization") || "";
    if (!token) {
        return res.status(401).json({
            "message": "Acceso denegado, no hay ningun token en los encabezados",
            "status": 401
        });
    }
    try {
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret || typeof jwt_secret !== "string") {
            return res.status(500).json({
                "message": "Error interno del servidor, clave secreta no definida.",
                "status": 500,
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
        console.log("Decodificado", decoded);
        //req.user = decoded; // Adjuntar la info del usuario al objeto de solicitud
        next(); // Continuar con la siguiente función (controlador)
    }
    catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({
            message: "Token inválido o expirado.",
        });
    }
};
exports.authMiddleware = authMiddleware;
