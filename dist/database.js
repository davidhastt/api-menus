"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
//import {config} from 'dotenv';
//config();
//si se desarrolla en entorno local activa este bloque de codigo
/*
export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password: 'davitzoL18',
    database: 'menusdb'
});
*/
//external url de render
exports.pool = new pg_1.Pool({
    user: 'davidmillan',
    host: 'dpg-ckuhmr237rbc738ccnq0-a.oregon-postgres.render.com',
    password: 'D3zujgTZLkwBCPSowXCPzLBqFAEi27m8',
    database: 'menusdb',
    port: 5432,
    ssl: true
});
