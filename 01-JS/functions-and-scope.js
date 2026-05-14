/**
 * ============================================================================
 * JAVASCRIPT: FUNCTIONS AND SCOPE - INTERVIEW PREP GUIDE
 * ============================================================================
 *
 * KEY CONCEPTS:
 *
 * 1. FUNCTION TYPES (3 Main Ways to Define Functions)
 *    ──────────────────────────────────────────────────
 *    • Function Declaration: function funcName() {} - Hoisted, can be called before definition
 *    • Function Expression: const func = function() {} - Not hoisted, assigned to variable
 *    • Arrow Function: const func = () => {} - Lexical 'this', no arguments object, concise syntax
 *
 *    Interview tip: Arrow functions don't have their own 'this' - they inherit from parent scope!
 *
 * 2. THE 'this' KEYWORD (Most Confusing Topic in JavaScript!)
 *    ──────────────────────────────────────────────────────────
 *    • In method: Points to the object the method is called on
 *    • In function: Points to global object (window/undefined in strict mode)
 *    • In arrow function: Inherits 'this' from lexical scope (surrounding code)
 *    • In event handler: Points to the element that triggered the event
 *    • In constructor: Points to the newly created instance
 *
 *    Interview tip: Arrow functions are great for callbacks but bad for methods!
 *
 * 3. CLOSURES (Functions that remember their outer scope)
 *    ──────────────────────────────────────────────────────
 *    • Inner functions can access variables from outer functions even after outer function returns
 *    • Used for data privacy, currying, memoization, and event handlers
 *    • Arrow functions in closures inherit 'this' from their defining scope
 *
 *    Interview tip: "A closure is a function that has access to variables in its outer scope,
 *    even after the outer function has returned."
 *
 * 4. ARRAY METHODS IMPLEMENTATION (Understand the internals!)
 *    ──────────────────────────────────────────────────────────
 *    • map(): Transform each element, return new array of same length
 *    • filter(): Test each element, return array with elements that pass test
 *    • reduce(): Accumulate values, return single value (can be any type)
 *
 *    Interview tip: Know the callback signature: (element, index, array) for map/filter,
 *    (accumulator, element, index, array) for reduce.
 *
 * 5. IIFE (Immediately Invoked Function Expression)
 *    ────────────────────────────────────────────────
 *    • Function that runs immediately after definition: (function() { ... })()
 *    • Creates private scope, avoids global namespace pollution
 *    • Was crucial before ES6 block scope (let/const)
 *    • Still useful for module patterns and avoiding variable hoisting issues
 *
 *    Interview tip: IIFEs create their own scope and are executed immediately.
 *
 * COMMON INTERVIEW QUESTIONS:
 * 🔹 Explain the difference between function declaration and function expression
 * 🔹 How does 'this' work in arrow functions vs regular functions?
 * 🔹 What is a closure? Give a practical example
 * 🔹 Implement map/filter/reduce from scratch
 * 🔹 When would you use an IIFE?
 * 🔹 Explain lexical scoping vs dynamic scoping
 * 🔹 How do arrow functions handle 'this' differently?
 * 🔹 What's the difference between call(), apply(), and bind()?
 * 🔹 How do you handle 'this' in event handlers?
 *
 * ADVANCED SCENARIOS TO REMEMBER:
 * • Arrow function in object method: 'this' refers to global/undefined
 * • setTimeout with function: 'this' is global/undefined
 * • setTimeout with arrow function: 'this' inherits from scope
 * • Event listener with function: 'this' is the element
 * • Event listener with arrow function: 'this' is from outer scope
 *
 * ============================================================================
 */

{
    function func() {
        console.log("Normal function");
    }

    const expFunc = function() {
        console.log("Function expression");
    }

    const arrFunc = (name) => {
        console.log("Arrow function" + name);
    }
}

{
    // this keyword in different functions
    const obj = {
        name: "sai",
        normalFunc() {
            console.log(this.name); // "sai"
        },
        expFunc: function() {
            console.log(this.name); // "sai"
        },
        arrFunc: () => {
            console.log(this.name); // undefined, because arrow functions do not have their own this
        }
    }

    // using this inside arrowfunction with a closure example
    const obj2 = {
        name: "chandan",
        normalFunc() {
            // const that = this;
            const innerArrowFunc = () => {
                console.log(this.name); // "chandan", because innerArrowFunc inherits this from normalFunc
            }
            function inner() {
                console.log(this.name, this); // undefined, because this refers to the global object in non-arrow functions and if we bind the callback to this it will work or else use arrow function
            }
            innerArrowFunc();
            inner();
        }
    }

    const obj3 = {
        name: "yata",
        func() {
            setTimeout( function() {
                console.log(this.name); // undefined, because this refers to the global object in non-arrow functions and if we bind the callback to this it will work or else use arrow function
            }, 1000); // this will refer to the global object (window in browsers) or undefined in strict mode
        }
    }

    button.addEventListener("click", function() {
        console.log(this); // this will refer to the button element that was clicked
    });
    
    button.addEventListener("click", () => {
        console.log(this); // this will refer to the surrounding scope, which is likely the global object or undefined in strict mode so we need to use event object to access the button element in this case
    });

}

{
    // Map reduce and filter implementations

    Array.prototype.myMap = function(callback) {
        const result = [];
        for(let i=0; i < this.length; i++) {
            result.push(callback(this[i], i, this));
        }
        return result;
    }

    Array.prototype.myFilter = function(callback) {
        const result = [];
        for(let i=0; i < this.length; i++) {
            if(callback(this[i], i, this)) {
                result.push(this[i]);
            }
        }
        return result;
    }

    Array.prototype.myReduce = function(callback, initialValue) {
        let accumulator = initialValue === undefined ? this[0] : initialValue;
        let startIndex = initialValue === undefined ? 1 : 0;
        for(let i=startIndex; i < this.length; i++) {
            accumulator = callback(accumulator, this[i], i, this);
        }
        return accumulator;
    }
}

{
    // IIFE (Immediately Invoked Function Expression)
    (function() {
        console.log("This is an IIFE");
    })();

    // Before ES6, IIFEs were commonly used to create a new scope and avoid polluting the global namespace. With the introduction of block scope using let and const, the need for IIFEs has diminished, but they are still useful for creating a new scope for variables and functions.
}