'use strict'

const Lexer = require('./lexer')
const LLParser = require('./llParser')
const Parser = require('./parser')
const rule = Parser.rule
const debug = require('debug')('compiler')



/**
 * 保留字set
 * @const
 * @type {Object}
 */
const reserved = {
	';': 1,
	'}': 1,
	'\n': 1,
	'{': 1	
}
/**
 * 操作符优先级表map
 * @const
 * @type {Object}
 */
const operators = {
	'=': {val:1, left: false},
	'==': {val:2, left: true},
	'>': {val:2, left: true},
	'<': {val:2, left: true},
	'+': {val:3, left: true},
	'-': {val:3, left: true},
	'*': {val:4, left: true},
	'/': {val:4, left: true},
	'%': {val:4, left: true},		
}
/**
 * 环境对象,保存变量
 * @const
 * @type {Object}
 */
const ENVIRONMENT = {}






module.exports = function(code) {
	
	// 语法解析器 定义
	
	let expr = rule()
	let primary = rule('PrimaryExprNode').or(
		rule().sep('(').ast(expr).sep(')'),
		rule().number(),
		rule().identifier(reserved),
		rule().string()
	)
	let factor = rule().or(
		rule('NegativeExprNode').sep('-').ast(primary),
		primary
	)

	expr.expression(factor, operators)

	let simple = rule('PrimaryExprNode').ast(expr)
	let statement = rule()
	let block = rule('BlockStatement')
				.sep('{')
				.option(statement)
				.repeat(rule().sep(';','\n').option(statement))
				.sep('}')
	
	
	statement.or(
		rule('IfStatement').sep('if').ast(expr).ast(block).option(rule().sep('else').ast(block)),
		rule('WhileStatement').sep('while').ast(expr).ast(block),
		simple
	)
	let program = rule().or(
		statement,
		rule('NullStatement')
		).sep(';','\n')
		
	
	// 词法解析器 定义	 
	let l = new Lexer()

	
	// 词法解析	 
    l.readLine(code)

	let result = undefined
	while (l.length() > 0) {
		
		// 语法解析
		 
		let r = program.parse(l)
		
		// 解释执行
		 
		result = r.eval(ENVIRONMENT)
		
		// 中间结果debug
		
		debug(result)
	}
	
	// 最终结果返回
	
	return result
}