'use strict'
const mutations = require('./mutation')
const queries = require('./queries')
const types = require('./types')
module.exports ={

    Query: queries,
    Mutation: mutations,
    ...types
  }