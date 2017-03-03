class BlockStatement {
	constructor(nodes) {
		this.children = nodes
	}
	eval(env) {
		let result = undefined;
		for (let node of this.children) {
			result = node.eval(env)
		}
		return result
	}
}

module.exports = BlockStatement