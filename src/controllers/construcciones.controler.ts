import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";
import argon2 from 'argon2';
import jwt, { Secret } from 'jsonwebtoken';

import {Construccion} from "../interfaces/construcciones.interface";


export const nueva=async (req:Request, res:Response): Promise<Response>=>{//falta quitar el password de la respuesta

    let newConstruccion: Construccion= req.body;

    try{    
        //insertamos la construccion    
        let respuesta: QueryResult = await pool.query(
            'INSERT INTO public.construcciones (id_persona, tema, subtema, concepto, geom) VALUES ($1, $2, $3, $4, ST_GeomFromText($5, 4326)) RETURNING public.construcciones.id_construccion',
            [newConstruccion.id_persona, newConstruccion.tema, newConstruccion.subtema, newConstruccion.concepto, 'POINT('+ newConstruccion.coordinates[0]+' '+ newConstruccion.coordinates[1]+')']
        );

        //insertamos el nombre de edificio

        
        const id_construccion:number = respuesta.rows[0].id_construccion; //obtenemos el ultimo id insertado



        respuesta = await pool.query(
            'INSERT INTO public.nombres_edificios (id_construccion, nombre) VALUES ($1, $2)',
            [id_construccion, newConstruccion.nombre]
        );        




        for (const direccion of newConstruccion.direcciones) {
            respuesta = await pool.query(
                'INSERT INTO public.direcciones (id_construccion, direccion) VALUES ($1, $2)',
                [id_construccion, direccion]
            );
          }


          for (const corte of newConstruccion.cortes) {
            respuesta = await pool.query(
                'INSERT INTO public.cortes (id_construccion, año) VALUES ($1, $2)',
                [id_construccion, corte]
            );
          }          


          

            return res.json({
            message: 'La construccion se creo satisfactoriamente',
            body:{
                construccion:{
                    newConstruccion                    
                }
            }
            });




    }
    catch(e){
        console.error(e);    
        return res.status(500).json({"error": [e]});
    }    
    
}







export const construccionesInfo=async(req:Request, res:Response):Promise<Response>=>{//no es necesario actualizar esta funcion

    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
        //esto es lo que sale en la pagina web en formato json
        return res.status(200).json({
            "mensaje":"Bienvenido; a la sección de endpoints para personas, que son los siguientes:",
            "status":200,
            "endpoints":[
                {"Crear una construcción":`${url}/nueva`}
            ]
        });
}