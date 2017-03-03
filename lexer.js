
'use strict'

const debug = require('debug')('lexer')

// const reg = /\s*((\/\/.*)|([0-9]+)|("(.*)")|(\w[a-zA-Z0-9]*|==|<=|>=|&&|\|\||[^\w]))?/g
const reg = /[\t ]*((\/\/.*)|([0-9]+)|("(.*)")|(\w[a-zA-Z0-9]*|==|<=|>=|&&|\|\||[^\w]))?/g

class Lexer {
    constructor() {
        this.queue = []
    }

    read() {
        if (this.queue.length > 0) {
            return this.queue.shift()
        } else {
            return 'EOF'
        }
    }

    peek() {
        if (this.queue.length > 0) {
            return this.queue[0]
        } else {
            return 'EOF'
        }
    }

    readLine(line) {
        let pos = 0
        let endPos = line.length
        while (pos < endPos) {
            let r = reg.exec(line)
            this.addToken(r)
            pos = reg.lastIndex
        }
        reg.lastIndex = 0
    }

    addToken(matcher) {
        if (!matcher[1]) {
            return // 空行跳过
        }
        if (matcher[2]) {
            return // 注释跳过
        }
        if (matcher[3]) {
            // 数字字面量
            let token = {
                type: 'number',
                val: parseFloat(matcher[3])
            }
            this.queue.push(token)
            debug(token)
            return
        }
        if (matcher[4]) {
            // 字符串字面量
            let token = {
                type: 'string',
                val: matcher[5]
            }
            this.queue.push(token)
            debug(token)
            return
        }
        if (matcher[6]) {
            // 标记符
            let token = {
                type: 'identifier',
                val: matcher[6]
            }
            this.queue.push(token)
            debug(token)
            return

        }
    }
}

module.exports = Lexer