const LeafNode = require('../../tree').LeafNode

/**
 * 匹配那些不是变量但需要被保留到语法树中的标识符
 * @class
 */
class IdentifierToken {
	constructor(pats) {
		this.tokens = pats
	}
	parse(lexer, res) {
		let t = lexer.read()
		if (this.test(t)) {
			res.push(new LeafNode(t))
			return
		}
		// 错误处理
		if (this.tokens.length > 0) {
			throw new Error(`token ${this.tokens[0]} excepted. ${t.type} : ${t.val} get`)
		} else {
			throw new Error('IdentifierToken')
		}
	}
	match(lexer) {
		let t = lexer.peek()
		return this.test(t)
	}
	/**
	 * @private
	 * @param {Token} t token
	 * @return {boolean} token是否是指定的类型
	 */
	test(t) {
		if (t.type === 'identifier') {
			for (let token of this.tokens) {
				if (token === t.val) {
					return true
				}
			}
		}
		return false
	}
}

module.exports = IdentifierToken