'use strict'

const debug = require('debug')('LLParser')
const NumberNode = require('./tree/numberNode')
const OperatorNode = require('./tree/operatorNode')
const BinaryExprNode = require('./tree/binaryExprNode')

class LLParser {

    constructor (lexer) {
        this.lexer = lexer
    }

    /**
     * 检查下一个token是否是val identifier
     * val {{string}} identifier的名字
     */
    isTooken(val) {
        let token = this.lexer.peek()
        if (token.type === 'identifier' && token.val === val) {
            return true
        } else {
            return false
        }
    }
    /**
     * 检查下一个token是否是val identifier读取并丢弃它
     * val {{string}} identifier的名字
     * "(" ")" 等符号被丢弃
     */
    token(val) {
        let token = this.lexer.read()
        if (token.type === 'identifier' && token.val === val) {
            return true
        } else {
            throw new Error('mistake')            
        }
    }
    /**
     * factor: NUMBER | "(" expression ")"
     */
    factor () {
        if (this.isTooken('(')) {
            this.token('(')
            let e = this.expression()
            this.token(')')
            return e
        } else {
            let t = new NumberNode(this.lexer.read()) 
            debug(t)
            return t
        }
    }
    /**
     * term: factor { ("*" | "/") factor }
     */
    term () {
        let left = this.factor()
        while (this.isTooken('*') || this.isTooken('/')) {
            let op = this.lexer.read()
            let right = this.factor()
            left = new BinaryExprNode(left, new OperatorNode(op), right)
        }
        return left
    }
    /**
     * term { ("+" | "-") term }
     */
    expression () {
        let left = this.term()
        while (this.isTooken('+') || this.isTooken('-')) {
            let op = this.lexer.read()
            let right = this.term()
            left = new BinaryExprNode(left, new OperatorNode(op), right)
        }
        return left
    }
}

module.exports = LLParser