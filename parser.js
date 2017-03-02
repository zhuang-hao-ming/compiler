'use strict'

const debug = require('debug')('Parser')
const NumberNode = require('./tree/numberNode')
const LeafNode = require('./tree/leafNode')
const BinaryExprNode = require('./tree/binaryExprNode')
const ListNode = require('./tree/listNode')
const NameNode = require('./tree/nameNode')
/**
 * 子语法树规则类
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


/**
 * 标识符的语法规则的类
 */
class IdentifyToken {
	constructor(pat) {
		this.tokens = pat
	}
	parse(lexer, res) {
		let t = lexer.read()
		if (t.type === 'identifier') {
			for (let token of this.tokens) {
				if (token === t.val) {
					res.push(new LeafNode(t))
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


/*
	Parser对象可以parse lexer得到一个progam语法树
*/
class Parser {
	constructor(className) {
		this.elements = []
		this.className = className || ''
	}
	rule(className) {
		return new Parser(className)
	}
	parse(lexer) {
		let results = []
		for (let ele of this.elements) {
			ele.parse(lexer, results)
		}
		return this.make(results)
	}
	make(results) {
		if (this.className) {
			return eval(`new ${this.className}(...results)`)
		} else {
			return new ListNode(this.className)
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
		this.elements.push(new IdentifyToken(pats))
		return this
	}
	sep(...pats) {
		this.elements.push(new SkipToen(pats))
		return this
	}
	ast(parser) {
		this.elements.push(new Tree(parser))
		return this
	}

}

module.exports = Parser