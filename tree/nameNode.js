'use strict'
const debug = require('debug')('NameNode')

class NameNode {
    constructor (token) {
        this.token = token
    } 
    eval() {
        return this.token.val
    }
}

module.exports = NameNode