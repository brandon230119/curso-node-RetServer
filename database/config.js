const mongoose = require( 'mongoose' );


const dbConnection = async () =>{


    try {

        await mongoose.connect(process.env.MONGODB_CN, {
            useNewUrlParse: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

    }catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }



}







module.exports = {
    dbConnection
}