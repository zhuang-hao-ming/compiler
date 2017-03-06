/**
 * 标识符的语法规则的类
 * 匹配那些不是变量而且也不需要被保存到语法树中的标识符
 * 例如 '{' '}' '(' ')'
 * @class
 */
class SkipToen {
	/**
	 * @param {Array.string} pats 标识符数组
	 */
	constructor(pats) {
		this.tokens = pats
	}
	/**
	 * @public
	 * @param {Lexer} lexer 词法解析器类
	 * @param {Array.Node} 语法树节点数组 
	 */
	parse(lexer, res) {
		let t = lexer.read()
		if (this.test(t)) {
			return true
		}
		// 错误处理
		if (this.tokens.length > 0) {
			throw new Error(`token ${this.tokens[0]} excepted. ${t.type} : ${t.val} get`)
		} else {
			throw new Error('identifyToken')
		}
	}
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

module.exports = SkipToen