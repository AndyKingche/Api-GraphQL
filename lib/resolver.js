'use strict'
const connectDB = require('../db/bd')
const { ObjectID } = require('mongodb')
let db
module.exports ={

    Query:{
        getCourses: async ()=>{

            let courses=[];
            try{
                db = await connectDB()
                courses = await db.collection('course').find().toArray()
                return courses
            }catch(error){
                console.error("Error al realizar un getCourses: "+error)
            }

        },
        getCourse: async (root, {id})=>{
            
            let course
            try{
                db = await connectDB()
                course = await db.collection('course').findOne({_id: ObjectID(id)})
                return course

            }catch(error){
                console.error("Error al realizar la consulta a un curso "+error)
            }
         

        }
    }
    
  }