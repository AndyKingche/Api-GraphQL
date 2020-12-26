'use strict'
const { ObjectID } = require('mongodb');
const conectDB = require('../db/bd');
const errores = require('./errorHandler');
module.exports = {
    createCourse: async (root,{input}) => {
        const defaults = {
            teacher: '',
            topic: ' '
        }
        const newCourse = Object.assign(defaults,input)

        let db
        let courses

        try{
            db = await conectDB()
            courses = await db.collection('course').insertOne(newCourse)
            newCourse._id = courses.insertedId
        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        return newCourse

    },createStudent: async (root,{input}) => {

        let db
        let student

        try{
            db = await conectDB()
            student = await db.collection('course').insertOne(input)
            input._id = student.insertedId
        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        return input

    },
    editCourse:async(root,{id,input})=>{
        let db
        let course

        try{
            db = await conectDB()
            course = await db.collection('course').updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = course.insertedId
            course = await db.collection('course').findOne({_id:ObjectID(id)})
            return course
        }catch(error){
            errores(error)
            console.error("Existe un error al editar un curso ")
        }
        
    }, editStudent:async(root,{id,input})=>{
        let db
        let student

        try{
            db = await conectDB()
            student = await db.collection('student').updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = course.insertedId
            student = await db.collection('student').findOne({_id:ObjectID(id)})

        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        return student
    },
    addPeople: async(root, { courseID, personID }) => {
        let db
        let person
        let course
        let newCourse
        try{
            db = await conectDB()
            course = await db.collection('course').findOne( { _id: ObjectID(courseID) } )
            
            person = await db.collection('student').findOne( { _id: ObjectID(personID) } )
            

            if(!course || !person) throw new Error('La persona o el curso no existe')

            await db.collection('course').updateOne(                
                { _id: ObjectID(courseID) },
                { $addToSet: { student: ObjectID(personID) } }
                )
                
                newCourse = await db.collection('course').findOne( { _id: ObjectID(courseID) } )
        }catch(error) {
            errores(error)
            console.error("Existe un error al agregar una persona a un curso ")
        }
        return newCourse
            
    }


}