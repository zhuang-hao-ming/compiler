const LeafNode = require('../../tree').LeafNode

/**
 * 字符串字面量规则
 * @class
 */
class StringToken {
	parse(lexer, res) {
		let t = lexer.read()
		if (this.test(t)) {
			res.push(new LeafNode(t))
		} else {
			throw new Error('StringToken')
		}
	}
	match(lexer) {
		let t = lexer.peek()
		return this.test(t)
	}
	test(t) {
		if (t.type === 'string') {
			return true
		} else {
			return false
		}
	}
}

module.exports = StringToken