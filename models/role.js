


const {Schema, model}= require('mongoose');





const RoleShema = Schema({

    rol: { 
        type: String,
        require: true,

    }

});





module.exports = model('Role', RoleShema);