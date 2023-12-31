const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();

    router.get('/', usuariosGet);

    //actualizar
    router.put('/:id' ,[
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
    ],usuariosPut);

    //crear
    router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 letras').isLength({min: 6}),
        check('correo').custom(emailExiste),
        //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check ('rol').custom((rol) => esRolValido (rol) ),
        validarCampos,

    ], usuariosPost);

    //eliminar
    router.delete('/:id',[
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ], usuariosDelete);

    router.patch('/', usuariosPatch);

    







module.exports = router;