### for-in(怎么理解数组是特殊的对象？)
for-in的作用是**枚举对象的“可枚举”属性**！先列出for-in的语法：
```JavaScript
for (variable in object) {
    statement
}
```

对于for-in枚举对象的属性这一作用，很好理解，如下代码：
```JavaScript
var obj = {
    x: 1,
    y: "hello",
    z: false
}

for (var attr in obj) {
    console.log(String(attr) + " is a " + typeof(attr));
}

// output：
x is a string
y is a string
z is a string

```
上面的代码很直观，for-in枚举了对象obj的属性，并且可以看到属性（名称）是字符串。

这里**值得注意**的是，variable可以是任何左值表达式或者用var／const／let声明的变量。总之，variable可以是（也必须是）一个左值。比如下面的代码将一个对象的属性放到一个数组中：
```JavaScript
var obj = {
    x: 1,
    y: "hello",
    z: false
};

var arr = [];
var i = 0;
for (arr[i++] in obj) {
    // do nothing
}

console.log(arr);

// output
(3) ["x", "y", "z"]

```

再拿一个数组当例子：
```JavaScript
var arr = [1, 'hello', false];

for (var i in arr) {
    console.log(arr[i]);
}

// output
1
hello
false
```
上面的代码，在意料之中输出了数组元素的值，遍历数组的形式与C++一样。以至于咋看之下，以为for-in在遍历数组，并且变量i是数组的元素的索引。
下面的代码能说明：这里for-in中的变量i依然是在枚举对象属性，只不过这个属性与数组元素的索引有关。但他们绝不是一回事。

```JavaScript
var arr = [1, 'hello', false];

for (var i in arr) {
    console.log(String(i) + " is a " + typeof(i));
}

// output
0 is a string
1 is a string
2 is a string

```
这说明什么？说明了不管for-in是作用与对象还是数组，它的枚举variable枚举的都是属性（其类型都是string）。对于数组，显然，枚举变量（上面的i）并不是
数组元素的索引（整数）。这就是数组的特殊性。

下面总结一下，如何理解“**数组是特殊的对象**”: 可以把数组当成一个以元素索引（转换为字符串）为属性，以元素值为属性值的一个对象。比如：
```JavaScript

var arr = [1, 'hello', false];

```
上面的数组可以认为和这个对象等价：
```JavaScript
var arr = {
    "0": 1,
    "1": "hello",
    "2": false
}

```