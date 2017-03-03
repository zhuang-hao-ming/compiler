/**
 * 或规则
 */
class OrTree {
	constructor(parsers) {
		this.parsers = parsers
	}
	parse(lexer, res) {
		let p = this.choose(lexer)
		if (p === null) {
			throw new Error('parse OrTree error', this.parsers)
		}
		res.push(p.parse(lexer))
	}
	match(lexer) {
		return this.choose(lexer) !== null	
	}
	choose(lexer) {
		for (let p of this.parsers) {
			if (p.match(lexer)) {
				return p
			}
		}
		return null
	}
}

module.exports = OrTree