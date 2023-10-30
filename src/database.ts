import { Pool } from "pg";

export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password: 'davitzoL18',
    database: 'geografiamx',
    port: 5432
});