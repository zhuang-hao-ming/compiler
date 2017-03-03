'use strict'

const debug = require('debug')('Parser')






/**
 * 语法树节点类
 */
const {
	LeafNode,
	NameNode,
	NumberNode,
	OperatorNOde,

	ListNode,
	BlockStatement,
	IfStatement,
	WhileStatement,
	NullStatement,

	BinaryExprNode,
	NegativeExprNode,
	PrimaryExprNode,
} = require('./tree')


/**
 * 规则类
 */
const {
	IdentifierToken,
	NumToken,
	OrTree,
	SkipToken,
	StringToken,
	Tree,
	VariableToken,
	Expr,
	Repeat,
} = require('./rule')


/*
	Parser对象可以parse lexer得到一个progam语法树
*/
class Parser {
	constructor(className = '') {
		this.elements = []
		this.className = className
	}

	parse(lexer) {
		let results = []
		for (let ele of this.elements) {
			ele.parse(lexer, results)
		}
		return this.make(results)
	}
	match(lexer) {
		if (this.elements.length === 0) {
			return true
		} else {
			return this.elements[0].match(lexer)
		}
	}

	make(results) {
		if (this.className) {
			return eval(`new ${this.className}(results)`)
		} else {
			if (results.length === 1) {
				return results[0] // 如果子树只有一个节点,且没有显式的指定根节点的类型时,直接将他作为子树
			} else {
				return new ListNode(results)
			}
			
		}
	}
	number() {
		this.elements.push(new NumToken())
		return this
	}
	string() {
		this.elements.push(new StringToken())
		return this
	}
	token(...pats) {
		this.elements.push(new IdentifierToken(pats))
		return this
	}
	identifier(reserved) {
		this.elements.push(new VariableToken(reserved))
		return this
	}
	sep(...pats) {
		this.elements.push(new SkipToken(pats))
		return this
	}
	ast(parser) {
		this.elements.push(new Tree(parser))
		return this
	}
	or(...parsers) {
		this.elements.push(new OrTree(parsers))
		return this
	}
	expression(parser, operators) {
		this.elements.push(new Expr(parser, operators))
		return this
	}
	option(parser) {
		this.elements.push(new Repeat(parser, true))
		return this
	}
	repeat(parser) {
		this.elements.push(new Repeat(parser, false))
		return this
	}

}

module.exports = Parser
module.exports.rule = function (className) {
	return new Parser(className)
}