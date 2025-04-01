import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";
//no olvides ponerles try, catch


export const getTiendasXcercania= async(req:Request, res:Response): Promise<Response>=>{
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





export const getInfo=async(req:Request, res:Response):Promise<Response>=>{//no es necesario actualizar esta funcion

    let url = req.protocol + '://' + req.get('host') + req.originalUrl;

        return res.status(200).json({
            "mensaje":"Bienvenido",
            "status":200,
            "endpoints":[
                {"pruebaConexionDB":`${url}prueba`},
                {"crearPersona":`${url}crearpersona`},
                {"obtenerPersonas":`${url}personas`},
                {"obtenerPersonaXid":`${url}personas/id_persona`},
                {"actualizarPersona":`${url}personas/id_persona`},
                {"borrarPersona":`${url}personas/id_persona`}

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



export const getUsers= async(req:Request, res:Response): Promise<Response>=>{
    try{
        const response: QueryResult= await pool.query('SELECT * FROM public.personas');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({"error":[`NodeJS dice ${e}`]});
    }
    
}

export const deleteUser=async (req:Request, res:Response): Promise<Response>=>{
    const id_persona = parseInt(req.params.id_persona);
    await pool.query('DELETE FROM public.personas WHERE id_persona=$1', [id_persona]);
    return res.json({"Mensaje": `La persona con id_perona =  ${id_persona} fue eliminado`});

    //console.log(req.params.id);
    //res.send('deleting');
}


export const updateUser=async (req:Request, res:Response): Promise<Response>=>{
    const id_persona = parseInt(req.params.id_persona);
    const {id_tienda, tipo, nombre, apaterno, amaterno, fechaNac, telefono} = req.body;

    await pool.query('UPDATE public.personas SET  id_tienda = $1, tipo = $2, nombre = $3, apaterno = $4, amaterno = $5, "fechaNac" = $6, telefono = $7 WHERE id_persona = $8', [id_tienda, tipo, nombre, apaterno, amaterno, fechaNac, telefono, id_persona]);
    return res.json({"Mensaje": `La persona con id_perona =  ${id_persona} fue actualizada`});


}

export const getUserById=async (req:Request, res:Response): Promise<Response>=>{
    //console.log(req.params.id);
    //res.send('recived');
    const id_persona = parseInt(req.params.id_persona);
    const response: QueryResult= await pool.query('SELECT * FROM public.personas WHERE id_persona = $1', [id_persona]);
    return res.json(response.rows);
}


export const createUser=async (req:Request, res:Response): Promise<Response>=>{
    const {id_tienda, tipo, nombre, apaterno, amaterno, fechaNac, telefono}=req.body;
    try{
        const response: QueryResult=await pool.query('INSERT INTO public.personas (id_tienda, tipo, nombre, apaterno, amaterno, "fechaNac", telefono) VALUES ($1, $2, $3, $4, $5, $6, $7 )', [id_tienda, tipo, nombre, apaterno, amaterno, fechaNac, telefono]);
        return res.json({
            message: 'El usario se creo satisfactoriamente',
            body:{
                user:{
                    id_tienda, 
                    tipo, 
                    nombre,
                    apaterno,
                    amaterno,
                    fechaNac,
                    telefono
                }
            }
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({"error":[`NodeJS dice ${e}`]});

    }
    //console.log(req.body);
    //res.send('recived');
}