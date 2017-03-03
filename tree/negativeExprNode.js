'use strict'
const debug = require('debug')('NegativeExprNode')

class NegativeExprNode {
    constructor (nodes) {
        this.children = nodes
    }
    eval() {
        
    }
}

module.exports = NegativeExprNode