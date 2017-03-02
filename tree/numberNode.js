'use strict'
const debug = require('debug')('NumberNode')

class NumberNode {
    constructor (token) {
        this.token = token
    } 
    eval() {
        return this.token.val
    }
}

module.exports = NumberNode