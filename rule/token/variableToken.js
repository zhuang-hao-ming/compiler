const NameNode = require('../../tree').NameNode

/**
 * 匹配作为变量的标识符
 * @class
 * 
 */
class VariableToken {
	/**
	 * @param {Object={}} r 保留字set
	 */
	constructor(r = {}) {
		this.reserved = r
	}
	parse(lexer, res) {
		let t = lexer.read()
		if (this.test(t)) {
			res.push(new NameNode(t))
		} else {
			throw new Error('VariableToken')
		}
	}
	match(lexer) {
		let t = lexer.peek()
		return this.test(t)
	}
	test(t) {
		if (t.type === 'identifier' && !this.reserved[t.val]) {
			return true
		} else {
			return false
		}
	}
}

module.exports = VariableToken