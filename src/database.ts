import { Pool } from "pg";
import {config} from 'dotenv';

config();


export const pool = new Pool({
    user:'davidmillan',
    host:'dpg-ckuhmr237rbc738ccnq0-a.oregon-postgres.render.com',
    password: 'D3zujgTZLkwBCPSowXCPzLBqFAEi27m8',
    database: 'menusdb',
    port: 5432,
    ssl:true
});


/*
export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password: 'davitzoL18',
    database: 'geografiamx',
    port: 5432
});

*/

