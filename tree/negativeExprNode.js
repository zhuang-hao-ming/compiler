'use strict'
const debug = require('debug')('NegativeExprNode')

class NegativeExprNode {
    constructor (nodes) {
        this.children = nodes
    }
    eval(env) {
        let val = this.children[0].eval(env)
        val = parseFloat(val)
        if (!isNaN(val)) {
            return eval(`-${val}`)
        } else {
            throw new Error('NegativeExprNode eval error, env:', env)
        }
    }
}

module.exports = NegativeExprNode