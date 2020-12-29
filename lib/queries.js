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
    getPeople: async ()=>{

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
    getPerson: async (root, {id})=>{
        
        let student
        try{
            db = await connectDB()
            student = await db.collection('student').findOne({_id: ObjectID(id)})
            return student
    
        }catch(error){
            errores(error)
            console.error("Error al realizar la consulta a un curso ")
        }
     
    
    },
    seacrhItems:async (root,{ keywboards }) =>{
        let db
        let items
        let courses
        let people
        try {
          db = await connectDB()
          //console.log("key" , keywboards)
          courses = await db.collection('course').find(
           { $text: { $search: keywboards } }
           ).toArray()
           //console.log("c ", courses)
          people = await db.collection('student').find({
           $text: { $search: keywboards
          }
        }).toArray()
        //console.log("p ", people)
         items = [...courses, ...people]
      
      //console.log("j ", items)
        } catch (error) {
          errores(error)
        }
        console.log( items)
        return items
      }

}
