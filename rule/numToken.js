const NumberNode = require('../tree/numberNode')

/**
 * 数字字面量的语法规则的类
 */
class NumToken {
	match(lexer) {
		let t = lexer.peek()
		return this.test(t)
	}
	parse(lexer, res) {
		let t = lexer.read()
		if (this.test(t)) {
			res.push(new NumberNode(t))
		} else {
			throw new Error('NumToken error')
		}
	}
	test(t) {
		if (t.type === 'number') {
			return true
		} else {
			return false
		}
	}
}

module.exports = NumToken