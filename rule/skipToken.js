/**
 * 标识符的语法规则的类
 * 被匹配到的标识符将会被抛弃
 */
class SkipToen {
	/**
	 * pat {{array}} 标识符数组
	 */
	constructor(pat) {
		this.tokens = pat
	}
	parse(lexer, res) {
		let t = lexer.read()
		if (t.type === 'identifier') {
			for (let token of this.tokens) {
				if (token === t.val) {
					return
				}
			}
		}
		if (this.tokens.length > 0) {
			throw new Error(`token ${this.tokens[0]} excepted. ${t.type} : ${t.val} get`)
		} else {
			throw new Error('identifyToken')
		}
	}
	match(lexer) {
		let t = lexer.peek()
		if (t.type === 'identifier') {
			for (let token of this.tokens) {
				if (token === t.val) {
					return true
				}
			}
		} else {
			return false
		}
	}
}

module.exports = SkipToen