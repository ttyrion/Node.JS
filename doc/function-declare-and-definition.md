#### 函数声明语句与函数定义表达式
**函数声明语句**

函数声明语句就是一个声明了函数的语句，比如：
```JavaScript

function myAdd (x,y) {
    return x + y;
};

```

**函数定义表达式**

函数定义表达式就是值为一个函数的表达式，比如：
```JavaScript

var myAdd2 = function (x,y) {
    return x + y;
};

```

这两者在我们使用自定义的函数时基本没有区别，除了因为“**声明提前**”导致的差异：
```JavaScript

console.log("myAdd: " + myAdd(1,2));
console.log("myAdd2: " + myAdd2(1,2));

function myAdd (x,y) {
    return x + y;
};

var myAdd2 = function (x,y) {
    return x + y;
};

// output
myAdd: 3
TypeError: myAdd2 is not a function

```
因为有变量声明提前（这里可以理解为函数声明语句声明了一个函数变量）的特性，代码里面声明的变量会被提前到外部脚本或者外部函数作用域的顶部。所以这种方式声明的函数或变量，可以在定义之前被使用。但是，变量的赋值不会随着变量的声明提前。所以上面的例子中，myAdd2的声明被提前了，但是赋值没有，因此在myAdd2赋值语句之前，它还是undefined。

这就是函数声明语句和函数定义表达式之间的差异。