/**
 * @file 词法解析器类
 * @author haoming(cushaoming@163.com)
 */
'use strict'

const debug = require('debug')('lexer')
/**
 * 匹配token的正则表达式
 * @const
 * @type {RegExp}
 */
// const reg = /\s*((\/\/.*)|([0-9]+)|("(.*)")|(\w[a-zA-Z0-9]*|==|<=|>=|&&|\|\||[^\w]))?/g
const reg = /[\t ]*((\/\/.*)|([0-9]+)|("(.*)")|(\w[a-zA-Z0-9]*|==|<=|>=|&&|\|\||[^\w]))?/g

/**
 * @class
 */
class Lexer {
	/**
	 * 构造函数
	 * @public
	 */
    constructor() {
		/**
		 * 保存token的队列
		 * @type {Array.<Token>}
		 * @private
		 */
        this.queue = []
    }
	/**
	 * 获得当前token队列的长度
	 * @public
	 * @return {number} token队列的长度
	 */
	length() {
		return this.queue.length
	}
	/**
	 * 读取队列头部的一个token
	 * @private
	 * @return {Token} 
	 */
    read() {
        if (this.queue.length > 0) {
            return this.queue.shift()
        } else {
            return 'EOF'
        }
    }
	/**
	 * 查看队列的一个token
	 * @private
	 * @return {Token}
	 */
    peek() {
        if (this.queue.length > 0) {
            return this.queue[0]
        } else {
            return 'EOF'
        }
    }
	/**
	 * 解析代码
	 * @public
	 * @param {string} line 代码字符串
	 * 
	 */
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
	/**
	 * 对正则表达式匹配的结果进行解析
	 * @private
	 * @param {Array} matcher RegExp.exec的返回值
	 */
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