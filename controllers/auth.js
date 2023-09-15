const {response} = require ('express');
const Usuario = require ('../models/usuario');
const bcryptjs = require ('bcryptjs');

const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res=response)=>{

    const {correo, password } = req.body;

    try{

        //verificar si el email eiste
        const usuario = await Usuario.findOne({correo});

        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - correo'
            });
        }

        //si el usuario esta activo en la bd
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - estado: false'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - password'
            });
        }
        //generar el jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    }catch( error ){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador '
        })
    }

    
}





module.exports = {
    login
}