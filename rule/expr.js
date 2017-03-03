const LeafNode = require('../tree/leafNode')
const BinaryExprNode = require('../tree/binaryExprNode')
/**
 * operators: {{Object}}
 * {
 * 	'=': {val: 1, left: false},
 *  '+': {val: 2, left: true}
 * }
 */
class Expr {
	constructor(parser, operators) {
		this.parser = parser
		this.operators = operators
	}
	parse(lexer, res) {
		let right = this.parser.parse(lexer)
		let prec = null
		while (prec = this.nextOperator(lexer)) {
			right = this.doShift(lexer, right, prec)
		}
		res.push(right)
	}
	match(lexer) {
		return this.parser.match(lexer)
	}
	nextOperator(lexer) {
		let t = lexer.peek()
		if (t.type === 'identifier') {
			return this.operators[t.val]
		} else {
			return null
		}
	}
	doShift(lexer, left, leftPrec) {
		let list = []
		list.push(left)
		list.push(new LeafNode(lexer.read()))
		let right = this.parser.parse(lexer)
		let rightPrec = null
		while((rightPrec = this.nextOperator(lexer)) && this.rightIsHigh(rightPrec, leftPrec)) {
			right = this.doShift(lexer, right, rightPrec)
		}
		list.push(right)
		return new BinaryExprNode(list)
	}
	rightIsHigh(rightPrec, leftPrec) {
		if (rightPrec.left) {
			return leftPrec.val < rightPrec.val
		} else {
			return leftPrec.val <= rightPrec.val
		}
	}
}

module.exports = Expr