'use strict'
const courses = [
    {_id: '1bd',
        title: 'QUIMICA',
        teacher: 'ANDRES',
        description: 'ITS SO EASY',
        topic:'TABLA DE ELEMENTOS'},
        {_id: '2',
        title: 'FISICA',
        teacher: 'ANDRES',
        description: 'ITS SO EASY',
        topic:'MVR'},
        {_id: '3',
        title: 'LENGUAJE',
        teacher: 'ANDRES',
        description: 'ITS SO EASY',
        topic:'VERBOS'}
];
module.exports ={

    Query:{
        getCourses:()=>{
            return courses;
        },
        getCourse:(root,args) =>{
            const course = courses.find(course => {return course._id === args._id})
            return course;
        }
    }
    
  }