/**
 * 子语法树规则类
 * @class
 */
class Tree {

	constructor(p) {
		this.parser = p
	}
	parse(lexer, res) {
		res.push(this.parser.parse(lexer))
	}
	match(lexer) {
		return this.parser.match(lexer)
	}

}

module.exports = Tree