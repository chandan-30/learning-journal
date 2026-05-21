/**
 * ============================================================================
 * JAVASCRIPT: TYPES AND VARIABLES - INTERVIEW PREP GUIDE
 * ============================================================================
 * 
 * KEY CONCEPTS:
 * 
 * 1. VARIABLE DECLARATIONS (var, let, const)
 *    ─────────────────────────────────────────
 *    • var: Function-scoped, hoisted with 'undefined' as initial value
 *    • let: Block-scoped, hoisted but in Temporal Dead Zone (TDZ)
 *    • const: Block-scoped, hoisted in TDZ, cannot be reassigned (but object properties can be mutated)
 *    
 *    Interview tip: Explain hoisting - var is lifted to top with undefined, 
 *    while let/const are lifted but inaccessible (TDZ).
 * 
 * 2. PRIMITIVE TYPES (7 types in JavaScript)
 *    ────────────────────────────────────────
 *    • String: Immutable text data
 *    • Number: 64-bit floating point (includes Infinity, -Infinity, NaN)
 *    • BigInt: Arbitrarily large integers (append 'n' or use BigInt() function)
 *    • Boolean: true or false
 *    • Symbol: Unique and immutable identifier (for object property keys)
 *    • undefined: Variable declared but not initialized
 *    • null: Intentional absence of value (object type in typeof quirk)
 * 
 *    Interview tip: Remember typeof null === "object" is a famous quirk!
 * 
 * 3. TYPE CONVERSION (Explicit conversion)
 *    ────────────────────────────────────────
 *    • String(value): Convert any type to string
 *    • Number(value): Convert to number (null→0, undefined→NaN, true→1, false→0)
 *    • Boolean(value): Convert to boolean (0, "", null, undefined, NaN → false)
 *    • BigInt(value): Convert to bigint
 *    
 *    Interview tip: Mention implicit coercion vs explicit conversion.
 * 
 * 4. TYPE CHECKING METHODS (Choose the right one!)
 *    ────────────────────────────────────────────
 *    • typeof operator: Best for primitives
 *      - typeof variable: "string", "number", "boolean", "undefined", "object", "function", "symbol"
 *      - Limitation: typeof null === "object" (bug in JavaScript)
 * 
 *    • instanceof operator: Best for objects and arrays
 *      - [] instanceof Array → true
 *      - {} instanceof Object → true
 *      - Limitation: Won't work across different frames/windows
 * 
 *    • Object.prototype.toString.call(): Most reliable
 *      - Object.prototype.toString.call([]) → "[object Array]"
 *      - Object.prototype.toString.call({}) → "[object Object]"
 *      - Works even for null and undefined
 * 
 *    Interview tip: Explain when to use each method and why typeof null is "object".
 * 
 * 5. BLOCK SCOPE vs FUNCTION SCOPE
 *    ──────────────────────────────
 *    • var: Function-scoped (accessible outside if blocks)
 *    • let/const: Block-scoped (only accessible within {}, if, for, while, etc)
 *    
 *    Interview tip: Explain why let/const are preferred in modern JavaScript.
 * 
 * COMMON INTERVIEW QUESTIONS:
 * 🔹 What are the 7 primitive types in JavaScript?
 * 🔹 Explain the difference between var, let, and const
 * 🔹 What is hoisting? How does it work with var vs let/const?
 * 🔹 Why does typeof null return "object"?
 * 🔹 How do you reliably check the type of a value?
 * 🔹 What's the difference between undefined and null?
 * 🔹 Explain implicit type coercion with examples
 * 🔹 What's temporal dead zone (TDZ)?
 * 
 * ============================================================================
 */

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