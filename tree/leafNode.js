'use strict'
const debug = require('debug')('OperatorNode')

class LeafNode {
    constructor(token) {
        this.token = token
    }
    eval(env) {
        return this.token.val
    }
}

module.exports = LeafNode