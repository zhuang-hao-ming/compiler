const assert = require('assert')
const compiler = require('../')


describe('llParser', function() {
	const LLParser = require('../llParser')
	const Lexer = require('../lexer')
	
	it('should get 3.5', function () {
		let code = `1 + 1 * 5 / 2`
		let l = new Lexer()
		l.readLine(code)
		let p = new LLParser(l)
		let tree = p.expression()
		let r = tree.eval()
		assert.equal(r, 3.5)
	})

})


describe('compiler', function () {
	describe('main', function () {
		it('should get 4950', function () {

			let code1 = `
i = 1
s = 0
while (i < 100) {
	s = s + i 
	i = i + 1
}
s
`

			assert.equal(4950, compiler(code1))
		})
	})
})

