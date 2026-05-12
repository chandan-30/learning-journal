{
    // Types and Variables in JavaScript
    // We cannot access variables declared with let and const outside of their block scope, but we can access variables declared with var due to hoisting.
    var str = "Hello, World!";
    let num = 30;
    var bigNum = 30n;
    let boool = true;
    var udf = undefined;
    let nll = null;
    const sym = Symbol("1");
}

{
    // Explicit conversion
    let str = String(123); // "123";
    let num = Number("123"); // 123;
    let bigNum = BigInt(123); // 123n;
    let boool = Boolean(1); // true;
    let udf = String(undefined); // "undefined";
    let nll = String(null); // "null";
    let sym = String(Symbol("1")); // "Symbol(1)";
}

{
    // type checking
    typeof "111"; // "string"
    typeof 1; // "number"
    typeof true; // "boolean"
    typeof undefined; // "undefined"
    typeof null;    // "object" (this is a known quirk in JavaScript)

    // type checking for objects
    [] instanceof Array; // true
    {} instanceof Object  // true

    Object.prototype.toString.call([]); // "[object Array]"
    Object.prototype.toString.call({}); // "[object Object]"
}