import express from 'express';
import dotenv from 'dotenv';
import info from './routes/info.route';
import infoPersonas from './routes/personas.route';
import infoConstrucciones from './routes/construcciones.route'

// Carga las variables desde el archivo .env
dotenv.config()


const app = express();
//middlewares
app.use(express.json());//convertir datos en objetos json
app.use(express.urlencoded({extended:false}));//convertir datos de formularios html en objetos json

app.use(info);
app.use(infoPersonas);
app.use(infoConstrucciones);


const puerto=process.env.PORT

app.listen(puerto);
console.log(`NodeJS esta corriendo en el puerto ${puerto}`);
