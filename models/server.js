const express = require('express')

let usuarios = require('../routes/usuarios')
let cors = require('cors')

class Server{

    constructor(){
        this.app= express()
        this.port= process.env.PORT
        this.usuariosPath='/api/usuarios';
        
        //Middlewares
        this.middlewares();
        
        //Ruras de mi aplicacion
        this.routes();

    }

    middlewares(){
       
        //CORS
       this.app.use(cors());

       //Lectaura y parseo del body
       this.app.use(express.json());
        
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){

        //otro tipo de middl configuramos el router
    this.app.use(this.usuariosPath, usuarios);
    
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en : ",this.port)
        })
    }

}

module.exports = Server;