const { Router } = require('express');

const routerp = Router();

routerp.get('/', async (req,res) =>{
    res.json({
        error: false,
        msg: 'Brandon Larranaga'
    });
})


module.exports = routerp;