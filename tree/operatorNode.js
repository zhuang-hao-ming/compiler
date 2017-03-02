'use strict'
const debug = require('debug')('OperatorNode')

class OperatorNode {
    constructor(token) {
        this.token = token
    }
    eval() {
        return this.token.val
    }
}

module.exports = OperatorNode