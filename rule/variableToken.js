const NameNode = require('../tree/nameNode')

/**
 * 变量语法规则
 * 
 */
class VariableToken {
	/**
	 * r {{Object}} 保留字
	 */
	constructor(r = {}) {
		this.reserved = r
	}
	parse(lexer, res) {
		let t = lexer.read()
		if (t.type === 'identifier' && !this.reserved[t.val]) {
			res.push(new NameNode(t))
		} else {
			throw new Error('VariableToken')
		}
	}
	match(lexer) {
		let t = lexer.peek()
		if (t.type === 'identifier' && !this.reserved[t.val]) {
			return true
		} else {
			return false
		}
	}
}

module.exports = VariableToken