"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//si se desarrolla en entorno local activa este bloque de codigo
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'davitzoL18',
    database: 'menusdb',
    port: 5432,
    ssl: true
});
//external url de render
/*
export const pool = new Pool({
    user:'davidmillan',
    host:'dpg-ckuhmr237rbc738ccnq0-a',
    password: 'D3zujgTZLkwBCPSowXCPzLBqFAEi27m8',
    database: 'menusdb',
    port: 5432
});
*/
