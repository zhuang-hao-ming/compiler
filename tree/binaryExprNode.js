'use strict'
const debug = require('debug')('BinaryExprNode')

class BinaryExprNode {
    constructor (left, op, right) {
        this.left = left
        this.op = op
        this.right = right
    }
    eval() {
        let l = this.left.eval()
        let op = this.op.eval()
        let r = this.right.eval()
        return eval('' + l + op + r)
    }
}

module.exports = BinaryExprNode