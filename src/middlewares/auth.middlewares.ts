import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //const token = req.headers.authorization?.split(" ")[1]; // Extraer token del encabezado
    
    const token = req.header("Authorization") || "";
   
    if (!token) {        
        return res.status(401).json({
            "message":"Acceso denegado, no hay ningun token en los encabezados",
            "status":401
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
        const decoded = jwt.verify(token, jwt_secret);
        console.log("Nos visita", decoded);
        //req.user = decoded; // Adjuntar la info del usuario al objeto de solicitud
        next(); // Continuar con la siguiente función (controlador)
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ 
            message: "Token inválido o expirado.",
        });
    }
    
};