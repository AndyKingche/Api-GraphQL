'use strict'
const { ObjectID } = require('mongodb');
const conectDB = require('../db/bd');
const errores = require('./errorHandler')

module.exports = {
    Course :{
        student: async({ student }) => {
            let db
            let peopleData
            let ids
            try{
                db = await conectDB()
                ids = student ? student.map(id => ObjectID(id)) : []
                peopleData = ids.length > 0 
                ? await db.collection('student').find(
                    { _id:{ $in: ids } }
                ).toArray()
                : []
            }catch(error){
                errores(error)
                console.log("Error al resolver los types")

            }
            return peopleData

        }
    },
    Person: {
        __resolveType: ( person, context, info)=>{
            console.log(person)
            if(person.phone){
                return 'Monitor'
            }
            return 'Student'
        }
    },
    GlobalSearch:{
        __resolveType: (items, context, info)=>{
            
        if(items.tittle){
            return 'Course'
        }
        else if(items.phone){
            return 'Monitor'
        }
        return 'Student'
        }
    }
}