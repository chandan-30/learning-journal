/**
 * TYPESCRIPT — GENERICS & ADVANCED TYPES
 * ========================================
 * Quick-reference for interview prep. Each section covers one concept with the
 * key rule to remember, working examples, and common interview pitfalls.
 *
 * CONCEPTS COVERED
 * ─────────────────
 *
 * 1. GENERIC FUNCTIONS — <T> syntax, constraints with extends
 *    - Generics let you write one function that works across many types while
 *      still preserving type safety (unlike `any`).
 *    - `<T>` is a type parameter — a placeholder resolved at call time.
 *    - `extends` adds a constraint: T must be assignable to that type.
 *    - Key rule: use generics when the *relationship* between input and output
 *      types matters (e.g. "returns the same type I passed in").
 *
 * 2. GENERIC INTERFACES AND CLASSES
 *    - Interfaces and classes can carry their own type parameters, fixed when
 *      you instantiate or implement them.
 *    - Useful for containers like Stack<T>, Box<T>, or any wrapper.
 *    - Key rule: the type parameter lives on the class/interface, so every
 *      method automatically knows what T is.
 *
 * 3. CONDITIONAL TYPES — T extends U ? X : Y
 *    - Evaluate a type at compile time based on whether T satisfies a condition.
 *    - `infer` lets you extract a sub-type from within a conditional branch.
 *    - Distribute over unions: `(A | B) extends U ? X : Y` resolves for each
 *      union member separately, then combines the results.
 *
 * 4. MAPPED TYPES — [K in keyof T]: ...
 *    - Transform every property of an existing type systematically.
 *    - Built-in utility types (Partial, Required, Readonly) are all mapped
 *      types under the hood — understanding this unlocks all of them.
 *    - Modifiers: `?` adds optional, `-?` removes it; `readonly` / `-readonly`.
 *
 * 5. TEMPLATE LITERAL TYPES
 *    - Construct new string literal types by combining other string types,
 *      just like JS template literals but at the type level.
 *    - Automatically distribute over unions — generating all combinations.
 */


// ─────────────────────────────────────────────────────────────────────────────
// 1. GENERIC FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────
{
    // Basic generic — T is inferred from what you pass in
    function identity<T>(value: T): T {
        return value;
    }

    const n = identity(42);        // T = number
    const s = identity("hello");   // T = string

    // Constraint — T must have a .length property
    function logLength<T extends { length: number }>(item: T): void {
        console.log(item.length);
    }

    logLength("typescript");  // ✅ string has .length
    logLength([1, 2, 3]);     // ✅ array has .length
    // logLength(42);         // ❌ number has no .length

    // Multiple type params — K must be a key that actually exists on T
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    const user = { name: "Sai", age: 30 };
    const name = getProperty(user, "name");  // type: string
    // getProperty(user, "email");            // ❌ "email" is not a key of user
}


// ─────────────────────────────────────────────────────────────────────────────
// 2. GENERIC INTERFACES AND CLASSES
// ─────────────────────────────────────────────────────────────────────────────
{
    // Generic interface — the shape works for any T
    interface Box<T> {
        value: T;
        transform: (val: T) => T;
    }

    const numBox: Box<number> = { value: 10, transform: (n) => n * 2 };
    const strBox: Box<string> = { value: "hi", transform: (s) => s.toUpperCase() };

    // Generic class — Stack that only holds one type at a time
    class Stack<T> {
        private items: T[] = [];

        push(item: T): void { this.items.push(item); }
        pop(): T | undefined { return this.items.pop(); }
    }

    const numStack = new Stack<number>();
    numStack.push(1);
    numStack.push(2);
    console.log(numStack.pop()); // 2

    // numStack.push("hello"); // ❌ string is not assignable to number
}


// ─────────────────────────────────────────────────────────────────────────────
// 3. CONDITIONAL TYPES — T extends U ? X : Y
// ─────────────────────────────────────────────────────────────────────────────
{
    // Basic — is T a string?
    type IsString<T> = T extends string ? true : false;

    type A = IsString<"hello">;  // true
    type B = IsString<42>;       // false

    // infer — extract the element type out of an array
    type ElementType<T> = T extends (infer E)[] ? E : never;

    type C = ElementType<string[]>;  // string
    type D = ElementType<number[]>;  // number

    // Distribution — resolves separately for each union member
    type OnlyStrings<T> = T extends string ? T : never;

    type E = OnlyStrings<string | number | boolean>;  // string
}


// ─────────────────────────────────────────────────────────────────────────────
// 4. MAPPED TYPES — [K in keyof T]: ...
// ─────────────────────────────────────────────────────────────────────────────
{
    type User = { name: string; age: number; email: string };

    // Iterate every key of T and make it optional  (this is how Partial<T> works)
    type MyPartial<T> = {
        [K in keyof T]?: T[K];
    };

    type PartialUser = MyPartial<User>;
    // { name?: string; age?: number; email?: string }

    // Add readonly to every key  (this is how Readonly<T> works)
    type MyReadonly<T> = {
        readonly [K in keyof T]: T[K];
    };

    // Transform values — wrap each property's value in an array
    type Arrayify<T> = {
        [K in keyof T]: T[K][];
    };

    type ArrayUser = Arrayify<User>;
    // { name: string[]; age: number[]; email: string[] }
}


// ─────────────────────────────────────────────────────────────────────────────
// 5. TEMPLATE LITERAL TYPES
// ─────────────────────────────────────────────────────────────────────────────
{
    // Basic — enforce a string shape at the type level
    type Greeting = `Hello, ${string}!`;

    const g: Greeting = "Hello, Sai!";   // ✅
    // const x: Greeting = "Hi, Sai!";  // ❌ doesn't match the pattern

    // Distribute over a union — generates every combination
    type Direction = "top" | "right" | "bottom" | "left";
    type CSSPadding = `padding-${Direction}`;
    // "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

    // Combine two unions — cartesian product of all pairs
    type Size  = "sm" | "md" | "lg";
    type Color = "red" | "blue";
    type Variant = `${Size}-${Color}`;
    // "sm-red" | "sm-blue" | "md-red" | "md-blue" | "lg-red" | "lg-blue"

    // Capitalize helper — useful for auto-generating handler names
    type Event = "click" | "focus" | "blur";
    type Handler = `on${Capitalize<Event>}`;
    // "onClick" | "onFocus" | "onBlur"
}
