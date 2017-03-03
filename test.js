let str = `
  a = 2
  a = 3
`

const reg = /[\t ]*((\/\/.*)|([0-9]+)|("(.*)")|(\w[a-zA-Z0-9]*|==|<=|>=|&&|\|\||[^\w]))?/g 

console.log(reg.exec(str))
console.log(reg.exec(str))
console.log(reg.exec(str))
console.log(reg.exec(str))
console.log(reg.exec(str))
console.log(reg.exec(str)) 