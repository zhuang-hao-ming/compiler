'use strict'
const debug = require('debug')('BinaryExprNode')

class BinaryExprNode {
    constructor (nodes) {
        this.nodes = nodes
    }
    eval(env) {

        let l = this.nodes[0]
        let opV = this.nodes[1].eval(env)
        let rV = this.nodes[2].eval(env)

        if (opV === '=') {
            let name = l.children[0].token.val
            env[name] = rV
            return rV
        } else {
            return eval('' + l.eval(env) + opV + rV)
        }
        
    }
}

module.exports = BinaryExprNode