'use strict'
const debug = require('debug')('ListNode')

class ListNode {
    constructor (nodes) {
        this.children = nodes
    }
    eval(env) {
		return 'list node'
    }
}

module.exports = ListNode