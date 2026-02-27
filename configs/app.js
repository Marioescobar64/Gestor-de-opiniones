'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { errorHandler } from '../middleware/handle-error.js';

// Rutas

import userRoutes from '../src/user/user-router.js'
import publicationRoutes  from '../src/publication/publication-router.js'
import commentRoutes  from '../src/comment/comment-router.js'


const BASE_URL = '/getionopiniones/v1';

// Configuracion de los middlewares (la aplicacion)
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb'}));
    // esta linea le indica a express que los archivos tengan un limite de 10mb
    app.use(cors(corsOptions));
 
    app.use(express.json({limit: '10mb'}));
    // cors utiliza la funcion que creamos en cors-configuration
    // Morgan se encarga del manejo de errores
    app.use(morgan('dev'));
}

// Rutas de integracion de todas las rutas

const routes =(app) => {
    app.use(`${BASE_URL}/usuario`, userRoutes);

    app.use(`${BASE_URL}/publicacion`, publicationRoutes);

    app.use(`${BASE_URL}/comentario`, commentRoutes);
}

// funcion para iniciar el servidor
const initServer = async (app) => {
    // Creacion de la instancia de la aplicacion
    app = express();
    const PORT = process.env.PORT || 3001;

    try {
        dbConnection();
        middlewares(app);
        routes(app);
        app.use(errorHandler);
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`)
        });

        // Primera ruta
        app.get(`${BASE_URL}/health`, (req, res) => { 
            res.status(200).json(
                {
                    status: 'ok',
                    service: 'Opiniones Admin',
                    version: '1.0.0'
                }
            );
        });

    } catch (error) {
        console.log(error);
    }
}

export  { initServer };