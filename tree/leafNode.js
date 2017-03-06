'use strict'
const debug = require('debug')('LeafNode')

class LeafNode {
    constructor(token) {
        this.token = token
    }
    eval(env) {
        return this.token.val
    }
}

module.exports = LeafNode