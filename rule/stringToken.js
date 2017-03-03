const LeafNode = require('../tree/leafNode')

/**
 * 字符串字面量token
 */
class StringToken {
	parse(lexer, res) {
		let t = lexer.read()
		if (t.type === 'string') {
			res.push(new LeafNode(t))
		} else {
			throw new Error('StringToken')
		}
	}
	match(lexer) {
		let t = lexer.peek()
		if (t.type === 'string') {
			return true
		} else {
			return false
		}
	}
}

module.exports = StringToken