'use strict'

const {  MongoClient } = require('mongodb')
const {
    DB_USER,
DB_PASSWD,
DB_HOST,
DB_PORT,
DB_NAME
}=process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
 let connection 
async function connectDB(){

    if(connection){
        return connection
    }

    let client
    try{
        client = await new MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        connection = await client.db(DB_NAME)
    }catch(error){
        console.log('No se pudo conectar a la base de datos de mongo', mongoUrl, error)
        process.exit(1)
    }
    return connection 
  }
  module.exports = connectDB;