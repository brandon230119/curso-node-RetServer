const { Router } = require('express');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');


const router = Router();

    router.get('/', usuariosGet);

    //actualizar
    router.put('/:id', usuariosPut);

    //crear
    router.post('/', usuariosPost);

    //eliminar
    router.delete('/', usuariosDelete);

    router.patch('/', usuariosPatch);

    







module.exports = router;