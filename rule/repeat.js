const debug = require('debug')('repeat')

class Repeat {
	constructor(parser, once) {
		this.parser = parser
		this.once = once		 
	}
	parse(lexer, res) {
		while(this.parser.match(lexer)) {
			let node = this.parser.parse(lexer)
			debug(node)
			res.push(node)
			if (this.once) {
				break
			}
		}
	}
	match(lexer) {
		return this.parser.match(lexer)
	}
}

module.exports = Repeat