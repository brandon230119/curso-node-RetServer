const {response, request} = require('express');
const bcrypt = require ('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async (req= request, res= response) => {

    const {limite = 5, desde=0 } = req.query;
    const query = { estado:true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number (desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res= response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    
    //todo validar contra base de datos
    if(password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosPost= async (req, res= response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    //verificar si el correo existe
    
    //encriptar el password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    //gardar en BD
    await usuario.save();

    res.json(usuario);
}

const usuariosDelete= async(req, res = response) => {

    const {id} = req.params;
     
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    
    res.json(usuario);
}

const usuariosPatch=(req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'

    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch 
}
