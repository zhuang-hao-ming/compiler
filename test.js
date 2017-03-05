// let str = `
//   a = 2
//   a = 3
// `

// const reg = /[\t ]*((\/\/.*)|([0-9]+)|("(.*)")|(\w[a-zA-Z0-9]*|==|<=|>=|&&|\|\||[^\w]))?/g 

// console.log(reg.exec(str))
// console.log(reg.exec(str))
// console.log(reg.exec(str))
// console.log(reg.exec(str))
// console.log(reg.exec(str))
// console.log(reg.exec(str)) 


	const LLParser = require('./llParser')
	const Lexer = require('./lexer')
	const assert = require('assert')
	let code = `1 + 1 * 5 / 2`
	let l = new Lexer()
	l.readLine(code)
	let p = new LLParser(l)
	let tree = p.expression()
	let r = tree.eval()
	assert.equal(r, 3.5)