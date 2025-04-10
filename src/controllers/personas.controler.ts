import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";
import argon2 from 'argon2';
//no olvides ponerles try, catch

export const createUser=async (req:Request, res:Response): Promise<Response>=>{

    const  {tipo, nombre, apaterno, amaterno, fechaNac, telefono, correo, password}=req.body;
    
    const hashedPassword = await argon2.hash(password);

    try{
        const response: QueryResult=await pool.query('INSERT INTO public.personas (tipo, nombre, apaterno, amaterno, fechaNac, telefono, correo, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tipo, nombre, apaterno, amaterno, fechaNac, telefono, correo, hashedPassword]);
        return res.json({
            message: 'El usario se creo satisfactoriamente',
            body:{
                user:{
                    tipo,                                         
                    nombre,
                    apaterno,
                    amaterno,                    
                    fechaNac,
                    telefono,
                    correo                    
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


export const deleteUser=async (req:Request, res:Response): Promise<Response>=>{
    const id_persona = parseInt(req.params.id_persona);
    await pool.query('DELETE FROM public.personas WHERE id_persona=$1', [id_persona]);
    return res.json({"Mensaje": `La persona con id_perona =  ${id_persona} fue eliminado`});

    //console.log(req.params.id);
    //res.send('deleting');
}

export const updateUser=async (req:Request, res:Response): Promise<Response>=>{

    const id_persona = parseInt(req.params.id_persona);
    const {tipo, nombre, apaterno, amaterno, fechaNac, telefono, correo} = req.body;
    await pool.query('UPDATE public.personas SET tipo = $1, nombre = $2, apaterno = $3, amaterno = $4, fechaNac = $5, telefono = $6, correo= $7 WHERE id_persona = $8', [tipo, nombre, apaterno, amaterno, fechaNac, telefono, correo, id_persona]);
    return res.json({"Mensaje": `La persona con id_perona =  ${id_persona} fue actualizada`});


}


export const getUserById=async (req:Request, res:Response): Promise<Response>=>{
    //console.log(req.params.id);
    //res.send('recived');
    const id_persona = parseInt(req.params.id_persona);
    const response: QueryResult= await pool.query('SELECT * FROM public.personas WHERE id_persona = $1', [id_persona]);
    return res.json(response.rows);
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






export const personasInfo=async(req:Request, res:Response):Promise<Response>=>{//no es necesario actualizar esta funcion

    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
        //esto es lo que sale en la pagina web en formato json
        return res.status(200).json({
            "mensaje":"Bienvenido; a la sección de endpoints para personas, que son los siguientes:",
            "status":200,
            "endpoints":[
                {"mostrar todas las personas":`${url}all`},
                {"mostrar una persona por ID":`${url}id_persona`},
                {"Crear una persona":`${url}crear`},
                {"borrar una persona":`${url}id_persona`},
                {"actualizar una persona":`${url}id_persona`}
            ]
        });
}




