import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";



export const getInfo=async(req:Request, res:Response):Promise<Response>=>{// en esta funcion debes colocar los endpoint

    let url = req.protocol + '://' + req.get('host') + req.originalUrl;

        //esto es lo que aparece en el  navegador
        return res.status(200).json({
            "mensaje":"Bienvenido; a continuacion se muestra en formato JSON el menu de endpoints disponibles",
            "status":200,
            "endpoints":[
                {"pruebaConexion":`${url}pruebaConexion`},
                {"personas":`${url}personas/`},
                {"construcciones":`${url}construcciones`}

            ]
        });

        
  
}


export const pruebaConexionDB= async(req:Request, res:Response): Promise<Response>=>{
    try{
        const response: QueryResult= await pool.query('SELECT NOW()');
        console.log("Conexion exitosa");                
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({"error":[`NodeJS dice ${e}`]});
        
    }
    
}