import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";



export const tiendasnear= async(req:Request, res:Response): Promise<Response>=>{
    let query:string ='SELECT *' +
    'FROM tiendas ' +
    'INNER JOIN ubicaciones ' +
    'ON tiendas.id_tienda =ubicaciones.id_tp ' +
    'WHERE ST_DWithin(ubicaciones.xy, ST_SetSRID(ST_MakePoint(-99.67688542843177, 19.28662076007736), 4326), 0.10);'

    try{
        const response: QueryResult= await pool.query(query);
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({"error":[`NodeJS dice ${e}`]});
    }
    
}