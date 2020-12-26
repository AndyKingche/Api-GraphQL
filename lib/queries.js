'use strict'
const connectDB = require('../db/bd')
const { ObjectID } = require('mongodb') 
const errores = require('./errorHandler')
let db
module.exports = {
    getCourses: async ()=>{

        let courses=[];
        try{
            db = await connectDB()
            courses = await db.collection('course').find().toArray()
            return courses
        }catch(error){
            errores(error)
            console.error("Error al realizar un getCourses: ")
        }
    
    },
    getCourse: async (root, {id})=>{
        
        let course
        try{
            db = await connectDB()
            course = await db.collection('course').findOne({_id: ObjectID(id)})
            return course
    
        }catch(error){
            errores(error)
            console.error("Error al realizar la consulta a un curso ")
        }
     
    
    },
    getStudents: async ()=>{

        let students=[];
        try{
            db = await connectDB()
            students = await db.collection('student').find().toArray()
            return students
        }catch(error){
            errores(error)
            console.error("Error al realizar un getCourses: ")
        }
    
    },
    getStudent: async (root, {id})=>{
        
        let student
        try{
            db = await connectDB()
            student = await db.collection('student').findOne({_id: ObjectID(id)})
            return student
    
        }catch(error){
            errores(error)
            console.error("Error al realizar la consulta a un curso ")
        }
     
    
    }

}