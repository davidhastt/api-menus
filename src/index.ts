import express from 'express';

const app = express();

import info from './routes/info';
import indexRoutes from './routes/personas';


//middlewares
app.use(express.json());//convertir datos en objetos json
app.use(express.urlencoded({extended:false}));//convertir datos de formularios html en objetos json

app.use(indexRoutes);
app.use(info);


app.listen(4000);
console.log('NodeJS esta corriendo un api restful en el puerto 4000');
