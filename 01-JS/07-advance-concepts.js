/**
 * Advanced JavaScript Concepts - Interview Prep
 *
 * This file covers deep JavaScript features that demonstrate mastery of the language.
 * Understanding these concepts sets you apart in senior-level interviews.
 *
 * Key concepts:
 *
 * 1. Iterators and Iterables
 *    - Iterator: An object with a next() method that returns { value, done }.
 *    - Iterable: An object with a [Symbol.iterator]() method that returns an iterator.
 *    - for...of loops over iterables; for...in loops over object keys.
 *    - Enables custom looping behavior and lazy evaluation.
 *
 * 2. Generators
 *    - Functions declared with function* that yield values on demand.
 *    - Each call to next() resumes execution from the last yield statement.
 *    - yield* delegates to another generator.
 *    - Generators support two-way communication: pass data via next(value) to resume.
 *    - Useful for infinite sequences, async control flow, and producing sequences lazily.
 *
 * 3. WeakMap and WeakSet
 *    - WeakMap: key-value pairs where keys are objects (weak references).
 *    - WeakSet: collection of objects (weak references).
 *    - Objects can be garbage collected even if they're keys in a WeakMap/WeakSet.
 *    - No iteration, no .size property, keys() or values() methods unavailable.
 *    - Useful for private data, caching tied to object lifetime, or DOM node metadata.
 *
 * 4. Proxy and Reflect
 *    - Proxy: intercepts operations on objects (get, set, has, apply, construct, etc.).
 *    - Enables virtual properties, data validation, logging, and metaprogramming.
 *    - Reflect: provides static methods that mirror Proxy handlers (Reflect.get, .set, .has, etc.).
 *    - Together, they enable powerful abstraction patterns and transparent behavior modification.
 *
 * 5. Memory: Stack vs Heap
 *    - Stack: stores primitives and references; automatic cleanup; LIFO order; limited size.
 *    - Heap: stores objects, arrays, functions; dynamic allocation; requires garbage collection.
 *    - Understanding this explains closure memory behavior and performance implications.
 *    - Memory leaks occur when heap objects are no longer needed but still referenced.
 *
 * 6. Regular Expressions
 *    - Patterns for matching, searching, and replacing text.
 *    - Methods: test() (boolean), exec() (array), match(), replace(), split().
 *    - Flags: i (insensitive), g (global), m (multiline), s (dotAll), u (unicode).
 *    - Performance and readability matter; complex regexes can be slow.
 *
 * 7. Error types
 *    - SyntaxError: code parsing fails (invalid syntax).
 *    - ReferenceError: accessing undefined variable.
 *    - TypeError: operation on incompatible type (e.g., .call() on non-function).
 *    - RangeError: value outside allowed range (e.g., Array(-1)).
 *    - Custom errors: extend Error class for domain-specific exceptions.
 *
 * Interview tips:
 *    - Explain the difference between iterables and iterators carefully.
 *    - Demonstrate generator use cases like resumable computation and async handling.
 *    - Clarify weak references and when to use WeakMap/WeakSet.
 *    - Show how Proxy enables metaprogramming and validation.
 *    - Discuss stack memory for function calls vs heap for object storage.
 *    - Know the built-in error types and when to throw them.
 */

{
    // Iterators and iterables

    const rangeIterator = function (start, end) {
        return {
            next(){
                return start <= end ?
                    { state: start++, done: false } : { state: undefined, done: true};
            }
        }
    }

    const itr = rangeIterator(1,3);
    console.log(itr.next()); // { state: 1, done: false }
    console.log(itr.next()); // { state: 2, done: false }
    console.log(itr.next()); // { state: 3, done: false }
    console.log(itr.next()); // { state: undefined, done: true }

    // For In and For of
    const arr = [1,2,3];
    const obj = {0: 'a', 1: 'b'};

    for(let i of arr) console.log(i); 
    for(let i in obj) console.log(obj[i]);
}

{
    // Generators

    // Generator function
    function* simpleGenerator() {
        yield 1;
        yield 2;
        yield 3;
    }

    const gen = simpleGenerator();
    console.log(gen.next()); // { value: 1, done: false }
    console.log(gen.next()); // { value: 2, done: false }
    console.log(gen.next()); // { value: 3, done: false }
    console.log(gen.next()); // { value: undefined, done: true }

    // Generator with delegation
    function* delegator() {
        yield* simpleGenerator();
        yield 4;
    }

    const del = delegator();
    for(let val of del) console.log(val); // 1, 2, 3, 4

    // Generator with two-way communication
    function* communicator() {
        const msg1 = yield 'first';
        console.log(msg1);
        const msg2 = yield 'second';
        console.log(msg2);
    }

    const comm = communicator();
    console.log(comm.next()); // { value: 'first', done: false }
    console.log(comm.next('hello')); // logs 'hello', { value: 'second', done: false }
    console.log(comm.next('world')); // logs 'world', { value: undefined, done: true }

    // Infinite generator
    function* infinite() {
        let count = 0;
        while(true) yield count++;
    }

    const inf = infinite();
    console.log(inf.next().value); // 0
    console.log(inf.next().value); // 1
}

{
    // WeakMap and WeakSet

    // WeakMap - a collection of key-value pairs where keys are objects and values can be any type. Keys in WeakMap are weakly referenced, meaning they can be garbage collected if there are no other references to the object.
    const weakMap = new WeakMap();
    const obj1 = {};
    const obj2 = {};
    weakMap.set(obj1, 'value1');
    weakMap.set(obj2, 'value2');
    console.log(weakMap.get(obj1)); // 'value1'
    console.log(weakMap.get(obj2)); // 'value2'

    // WeakSet - a collection of objects where each object is stored as a key. Keys in WeakSet are weakly referenced, meaning they can be garbage collected if there are no other references to the object.
    const weakSet = new WeakSet();
    weakSet.add(obj1);
    weakSet.add(obj2);
    console.log(weakSet.has(obj1)); // true
    console.log(weakSet.has(obj2)); // true
}

{
    // Proxy and Reflect

    // Proxy - allows you to create a wrapper for an object that intercepts and customizes operations performed on that object (like property access, assignment, enumeration, function invocation, etc.)
    const target = { name: 'John', age: 30 };
    const handler = {
        get(target, prop) {
            console.log(`Getting property: ${prop}`);
            return target[prop];
        },
        set(target, prop, value) {
            console.log(`Setting property: ${prop} = ${value}`);
            target[prop] = value;
            return true;
        }
    };
    const proxy = new Proxy(target, handler);
    console.log(proxy.name); // Getting property: name
    proxy.age = 31; // Setting property: age = 31
    // Reflect - provides methods for interceptable JavaScript operations. It is often used in conjunction with Proxy to perform default behavior after custom logic.
    console.log(Reflect.get(target, 'name')); // Getting property: name
    Reflect.set(target, 'age', 32); // Setting property: age = 32
}

{
    // Memory - Stack vs Heap

    // Stack - used for static memory allocation and function call management. It stores primitive values and references to objects. Memory is automatically managed (LIFO order).
    function stackExample() {
        const a = 10; // stored in stack
        const b = 20; // stored in stack
        return a + b;
    }
    console.log(stackExample()); // 30

    // Heap - used for dynamic memory allocation. It stores objects, arrays, and functions. Memory management is more complex and can lead to fragmentation.
    const heapExample = { name: 'Alice', age: 25 }; // stored in heap
    console.log(heapExample.name); // 'Alice'
    console.log(heapExample.age); // 25
}

{
    // Regular Expressions

    // Regular expressions are patterns used to match character combinations in strings. They are used for searching, replacing, and validating strings.
    const regex = /hello/i; // case-insensitive match for "hello"
    console.log(regex.test('Hello')); // true
    console.log(regex.test('world')); // false
}

{
    // Error types
    // JavaScript has several built-in error types, including:
    // 1. SyntaxError - occurs when there is a syntax error in the code
    try {
        eval('foo bar'); // invalid JavaScript code
    } catch (e) {
        console.log(e instanceof SyntaxError); // true
    }
    // 2. ReferenceError - occurs when a non-existent variable is referenced
    try {        console.log(nonExistentVariable);
    } catch (e) {
        console.log(e instanceof ReferenceError); // true
    }
    // 3. TypeError - occurs when a value is not of the expected type
    try {
        null.f(); // cannot call function on null
    } catch (e) {
        console.log(e instanceof TypeError); // true
    }
    // 4. RangeError - occurs when a value is not within the allowed range
    try {
        new Array(-1); // array length cannot be negative
    } catch (e) {
        console.log(e instanceof RangeError); // true
    }
}