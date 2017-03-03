class IfStatement {
	constructor(nodes) {
		this.children = nodes
	}
	eval(env) {
		let condition = this.children[0].eval(env)
		if (condition) {
			return this.children[1].eval(env)
		} else {
			let elseBlock = this.children[2]
			if (elseBlock) {
				return elseBlock.eval(env)
			} else {
				return 0
			}
		}
		
	}
}

module.exports = IfStatement