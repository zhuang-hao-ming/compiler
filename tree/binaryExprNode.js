'use strict'
const debug = require('debug')('BinaryExprNode')

class BinaryExprNode {
    constructor (...nodes) {
        this.nodes = nodes
    }
    eval() {
        let l = this.nodes[0].eval()
        let op = this.nodes[1].eval()
        let r = this.nodes[2].eval()
        return eval('' + l + op + r)
    }
}

module.exports = BinaryExprNode