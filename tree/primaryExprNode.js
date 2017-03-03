'use strict'
const debug = require('debug')('PrimaryExprNode')

class PrimaryExprNode {
    constructor (nodes) {
        this.children = nodes
    }
    eval(env) {
        return this.children[0].eval(env)
    }
}

module.exports = PrimaryExprNode