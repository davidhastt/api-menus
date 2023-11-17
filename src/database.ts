import { Pool } from "pg";
import {config} from 'dotenv';

config();


//si se desarrolla en entorno local activa este bloque de codigo
/*
export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password: 'davitzoL18',
    database: 'menusdb',
    port: 5432,
    ssl:true
});
*/


//external url de render

export const pool = new Pool({
    user:'davidmillan',
    host:'dpg-ckuhmr237rbc738ccnq0-a',
    password: 'D3zujgTZLkwBCPSowXCPzLBqFAEi27m8',
    database: 'menusdb',
    port: 5432
});




