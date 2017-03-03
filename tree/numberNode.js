'use strict'
const debug = require('debug')('NumberNode')

class NumberNode {
    constructor (token) {
        this.token = token
    } 
    eval(env) {
        return this.token.val
    }
}

module.exports = NumberNode