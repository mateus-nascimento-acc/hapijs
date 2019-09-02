import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/user_hapi_db', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('MongoDB conectado!'))
    .catch(error => console.log('Deu Ruim ao conectar com MongoDB!: ', connection.error))

const db = mongoose.connection;


module.exports = db;