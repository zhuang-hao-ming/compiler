const LeafNode = require('../../tree').LeafNode

/**
 * 数字字面量的语法规则的类
 * @class
 */
class NumToken {
	/**
	 * @public
	 * @param {Lexer} lexer 词法解析器类
	 * @return {boolean} 下一个token是否匹配NumToken规则
	 */
	match(lexer) {
		let t = lexer.peek()
		return this.test(t)
	}
	/**
	 * @public
	 * @param {Lexer} lexer 词法解析器类
	 * @param {Array.Node} 语法树节点数组 
	 */
	parse(lexer, res) {
		let t = lexer.read()
		if (this.test(t)) {
			res.push(new LeafNode(t))
		} else {
			throw new Error('NumToken error')
		}
	}
	/**
	 * @private
	 * @param {Token} t token
	 * @return {boolean} token是否是指定的类型
	 */
	test(t) {
		if (t.type === 'number') {
			return true
		} else {
			return false
		}
	}
}

module.exports = NumToken