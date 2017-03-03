class WhileStatement {
	constructor(nodes) {
		this.children = nodes
	}
	eval(env) {
		let result = undefined
		while (true) {
			let condition = this.children[0].eval(env)
			if (!condition) {
				return result
			} else {
				result = this.children[1].eval(env)
			}
		}
	}
}

module.exports = WhileStatement