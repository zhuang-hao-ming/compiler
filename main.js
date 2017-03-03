
'use strict'

const Lexer = require('./lexer')
const LLParser = require('./llParser')
const Parser = require('./parser')
const rule = Parser.rule

let code5 = `
    (5+1) * (6+2) / (1+3);
    (5+1) * (6+2) / (1+3);
    9405 - 2940 / 28 * 21;
    920 - 1680 / 40 / 7 ;
    690 + 47 * 52 - 398;
`

let code6 = `
a = 2;
b = "string";
if a % 2 == 0 {
	b = "even";
} else {
	b = "odd";
}
a;
b;
`



const reserved = {
	';': 1,
	'}': 1,
	'\n': 1,
	'{': 1	
}
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

const ENVIRONMENT = {}


function main() {
    let l = new Lexer()
    l.readLine(code5)
    
    let p = new LLParser(l)
    
    
    while (p.lexer.queue.length > 0) {
        let r = p.expression()
		console.log(r)
        console.log(r.eval())
    }
    
}

function main1() {
	

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

	let l = new Lexer()
    l.readLine(code6)
	while (l.queue.length > 0) {
		let r = program.parse(l)
		let result = r.eval(ENVIRONMENT)
		console.log(result)
	}
	


	// console.log(JSON.stringify(r))
	// console.log(r)
	

}
main1()
// main()