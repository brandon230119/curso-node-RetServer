const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();
    }

    middlewares(){
        //cprs
        this.app.use( cors() );

        //Lectura y parseo del cors
        this.app.use (express.json ()); 

        //Directorio Publico
        this.app.use('/error', express.static("public"));
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){

        this.app.use('/', require('../routes/principal'));

        this.app.use(this.authPath, require('../routes/auth'));

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en el puerto:', this.port);
        } );
    }
}




module.exports = Server;