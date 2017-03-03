'use strict'
const debug = require('debug')('NameNode')

class NameNode {
    constructor (token) {
        this.token = token
    } 
    eval(env) {
        
        if (this.token.val in env) {
            return env[this.token.val]
        } else {
            throw new Error('NameNode eval error env: ', env)
        }
    }
}

module.exports = NameNode