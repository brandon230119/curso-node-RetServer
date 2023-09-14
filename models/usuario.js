

const { Schema, model} = require('mongoose');


const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        reqiured: [true, 'El correo es obligatorio'],
        inique: true
    },
    password: {
        type: String,
        reqiured: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        reqiured: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },


});


UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );