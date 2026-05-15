/**
 * ============================================================================
 * JAVASCRIPT: PROTOTYPES AND CLASSES - INTERVIEW PREP GUIDE
 * ============================================================================
 *
 * KEY CONCEPTS:
 *
 * 1. PROTOTYPE CHAIN (JavaScript's Inheritance Model)
 *    ────────────────────────────────────────────────────
 *    • Every object has a [[Prototype]] internal slot linking to another object
 *    • Property lookup: own properties → prototype → prototype's prototype → null
 *    • Manual tracing: Object.getPrototypeOf(obj) to walk the chain
 *    • Object.create(proto) creates object with explicit prototype link
 *
 *    Interview tip: Draw the prototype chain on paper - it's the key to understanding inheritance!
 *
 * 2. CONSTRUCTOR FUNCTIONS (Pre-ES6 OOP Pattern)
 *    ─────────────────────────────────────────────
 *    • Regular functions used with 'new' keyword to create instances
 *    • Instance properties set via 'this' in constructor
 *    • Shared methods added to Function.prototype
 *    • Pattern: function Constructor() { this.prop = value; }
 *
 *    Interview tip: Constructor functions are still used internally by ES6 classes.
 *
 * 3. ES6 CLASSES (Syntactic Sugar Over Prototypes)
 *    ────────────────────────────────────────────────
 *    • Cleaner syntax: class ClassName { constructor() {} method() {} }
 *    • Same prototype-based inheritance underneath - no new model
 *    • Methods automatically added to prototype
 *    • Constructor function created automatically
 *
 *    Interview tip: Classes are just syntactic sugar - they compile to constructor functions!
 *
 * 4. INHERITANCE (extends and super)
 *    ──────────────────────────────────
 *    • extends keyword: class Child extends Parent
 *    • super() in constructor: calls parent constructor (must be first)
 *    • super.methodName(): accesses parent methods
 *    • Method overriding: child redefines parent methods
 *
 *    Interview tip: super() must be called before using 'this' in child constructor.
 *
 * 5. STATIC MEMBERS (Belong to Class, Not Instances)
 *    ──────────────────────────────────────────────────
 *    • static methodName() {} - called on class: ClassName.methodName()
 *    • static propertyName - accessed on class, not inherited by instances
 *    • Used for utility functions or class-level data
 *
 *    Interview tip: Static members are not accessible on instances.
 *
 * 6. PRIVATE FIELDS (True Encapsulation)
 *    ─────────────────────────────────────
 *    • #fieldName syntax for private properties/methods
 *    • Only accessible within class definition
 *    • Not inherited by subclasses (unless through public methods)
 *    • Unlike underscore convention (_private) which is just a naming convention
 *
 *    Interview tip: Private fields provide true privacy, not just convention.
 *
 * COMMON INTERVIEW QUESTIONS:
 * 🔹 Explain the prototype chain with an example
 * 🔹 How does JavaScript inheritance work under the hood?
 * 🔹 What's the difference between constructor functions and ES6 classes?
 * 🔹 How do you manually walk the prototype chain?
 * 🔹 Explain the 'new' keyword and what it does
 * 🔹 What's the difference between static and instance members?
 * 🔹 How do private fields work in classes?
 * 🔹 Why is super() required in child constructors?
 * 🔹 How do you implement inheritance without classes?
 * 🔹 What's the difference between __proto__ and prototype?
 *
 * ============================================================================
 */

// ============================================
// PROTOTYPE CHAIN EXAMPLE
// ============================================
const proto = { greet() { return 'Hello'; } };
const obj = Object.create(proto);
console.log(obj.greet()); // 'Hello' - found in prototype
console.log(Object.getPrototypeOf(obj) === proto); // true


// ============================================
// CONSTRUCTOR FUNCTION EXAMPLE
// ============================================
function Vehicle(type) { 
    this.type = type; 
}
Vehicle.prototype.start = function() { 
    return `${this.type} starting`; 
};
const car = new Vehicle('Car');
console.log(car.start()); // 'Car starting'


// ============================================
// ES6 CLASS WITH INHERITANCE EXAMPLE
// ============================================
class Vehicle2 {
    constructor(type) { 
        this.type = type; 
    }
    start() { 
        return `${this.type} starting`; 
    }
}

class Car extends Vehicle2 {
    #speed = 0;
    
    constructor(type, color) {
        super(type);
        this.color = color;
    }
    
    start() {
        return super.start() + ' - Car specific logic';
    }
    
    static honk() { 
        return 'Beep beep!'; 
    }
    
    accelerate(amount) { 
        this.#speed += amount; 
    }
}

const myCar = new Car('Car', 'red');
console.log(myCar.start()); // 'Car starting - Car specific logic'
console.log(Car.honk()); // 'Beep beep!' - static method
myCar.accelerate(50);
console.log(myCar.constructor.name); // 'Car'