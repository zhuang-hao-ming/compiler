
'use strict'

const Lexer = require('./lexer')
const LLParser = require('./llParser')
const Parser = require('./parser')


let code5 = `
    (5+1) * (6+2) / (1+3)
    (5+1) * (6+2) / (1+3)
    9405 - 2940 / 28 * 21
    920 - 1680 / 40 / 7 
    690 + 47 * 52 - 398
`

let code6 = `1+2`




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
	let l = new Lexer()
    l.readLine(code6)
	let p = new Parser("BinaryExprNode")
	p.number().token('+').number()
	
	let r = p.parse(l)
	console.log(JSON.stringify(r))
	console.log(r.eval())

}
main1()
// main()