import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";
//no olvides ponerles try, catch

export const info=async(req:Request, res:Response):Promise<Response>=>{

    let url = req.protocol + '://' + req.get('host') + req.originalUrl;

        return res.status(200).json({
            "mensaje":"Bienvenido, estos son los endpoints disponibles para manejar personas",
            "status":200,
            "endpoints":[
                {"personas":`${url}`},
                {"personas all":`${url}/all`},
                {"crearpersona":`${url}/crearpersona`},
                {"persona x id":`${url}/id_persona`},
                {"persona update":`${url}/id_persona`}
                
            ]
        });

        
  
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