```
primary: "(" expr ")" | NUMBER | IDENTIFIER | STRING
factor: "-" primary | primary
expr: factor { OP factor }
simple: expr
block: "{"  statement "}"
statement: "if" expr block [ "else" block ] |
"while" expr block |
simple
program: [ statement ] (";" | EOL)
```

**program**是一个**语句(statement)**，是程序执行的单位，它可以是空语句，用EOL或者";"结尾
**语句(statement)**可以是if语句或者while语句或者简单的**表达式(expr)**
**表达式(expr)**是**基本元(factor)**和操作符的运算
**基本元(factor)**可以是数字字面量（包括负数），字符串字面量，标识符，或者表达式。
**block** 是用`{}`包括的**语句(statement)**

