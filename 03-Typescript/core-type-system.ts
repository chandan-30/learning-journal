/**
 * TYPESCRIPT — CORE TYPE SYSTEM
 * ==============================
 * Quick-reference for interview prep. Each section covers one concept with the
 * key rule to remember and common interview pitfalls.
 *
 * CONCEPTS COVERED
 * ─────────────────
 *
 * 1. TYPE INFERENCE vs TYPE ANNOTATIONS
 *    - TS infers types from assigned values and return statements automatically.
 *    - Annotate explicitly when: declaring empty collections (`[]`, `{}`),
 *      function parameters, and public API boundaries.
 *    - Key rule: prefer inference inside function bodies; prefer annotations on
 *      boundaries (params, return types, exported variables).
 *
 * 2. PRIMITIVE TYPES
 *    - number, string, boolean, undefined, null, bigint, symbol
 *    - Arrays: `number[]` (shorthand) or `Array<number>` (generic form) — same thing.
 *    - Tuples: fixed-length, position-typed arrays. `[string, number]` is NOT
 *      the same as `(string | number)[]`. Supports optional elements with `?`.
 *    - Enums: numeric (auto-increments from 0) or string. Compiled to real JS
 *      objects — use `const enum` to inline values and avoid the runtime object.
 *
 * 3. any, unknown, never
 *    - `any`: opts out of type checking entirely — avoid it.
 *    - `unknown`: type-safe any. Must narrow with typeof/instanceof before use.
 *      Interview rule: "use unknown for data you don't control (API responses,
 *      user input); never use any."
 *    - `never`: a value that can never exist. Used for exhaustive checks and
 *      functions that always throw or loop infinitely. TS uses it to detect
 *      unreachable code.
 *
 * 4. type vs interface
 *    - Both describe object shapes and are largely interchangeable.
 *    - KEY DIFFERENCE — Declaration merging: `interface` can be declared
 *      multiple times and TS merges them (useful for extending library types).
 *      `type` cannot be re-declared — you get a duplicate identifier error.
 *    - `type` is more powerful: can alias primitives, unions, intersections,
 *      tuples, and mapped types. `interface` is limited to object shapes.
 *    - Prefer `interface` for public library APIs (allows consumers to extend);
 *      prefer `type` for unions, tuples, and computed shapes.
 *
 * 5. UNION ( | ) and INTERSECTION ( & )
 *    - Union `A | B`: value can be A OR B. Must narrow before using type-specific
 *      methods (typeof, instanceof, discriminant property).
 *    - Intersection `A & B`: value must satisfy BOTH A AND B simultaneously.
 *      Combines object shapes — equivalent to merging all properties.
 *
 * 6. LITERAL TYPES and `as const`
 *    - Literal type: a type that is an exact value — `"N" | "S"`, `1 | 2 | 6`.
 *    - `as const`: tells TS to infer the narrowest possible (literal) type AND
 *      makes the object deeply readonly. Without it, `{ env: "prod" }` infers
 *      `{ env: string }`; with it, `{ env: "prod" }` (readonly literal).
 *
 * 7. OPTIONAL PROPERTIES and `readonly`
 *    - `prop?` in a type/interface means `prop: T | undefined` — the property
 *      may be absent. Use optional chaining `?.` to access safely.
 *    - `readonly` on a property prevents reassignment after initialization.
 *    - `ReadonlyArray<T>` (or `readonly T[]`) removes mutating methods like
 *      push/pop at compile time.
 *    - Note: `readonly` is a compile-time constraint only — JS has no runtime
 *      enforcement unless you use Object.freeze().
 */

{
    // Type inference
    let a = 1; // TypeScript infers that 'a' is of type 'number'

    function add(x: number, y: number) {
        return x + y; // TypeScript infers that the return type is 'number'
    }

    // Type annotations
    let b: string = "Hello, TypeScript!"; // Explicitly annotating 'b' as a string

    let arr: string[] = []; // Should mention the type explicitly for emplty collection.

}

{
    // Primitive types
    let n: number = 1;
    let s: string = "sai";
    let b: boolean = true;
    let u: undefined = undefined;
    let nil: null = null;
    let big: bigint = 123456n;
    let sym: symbol = Symbol("1");

    // Arrays
    let num: number[] = [1,2];
    let str: Array<string> = ["sai", "chandan"];

    // Fixed length tuples
    let tup1: [string, number] = ["sai", 30];
    let tup2: [string, number][] = [["sai", 30], ["chandan", 28]];
    let tup3: [string, number?] = ["sai"];

    // Objects
    let obj: { name: string; age: number } = { name: "sai", age: 30 };

    // Enums

    enum direction {
        up, down, left, right // By default values will be 0, 1, 2, 3
    }

    enum status {
        Active = "active",
        Inactive = "Inactive"
    }

    let stat: status = status.Active;

}

{
    /** Any, Unknow and never */

    let a: any = "sai";
    a = 2;

    // Use unknown instead of any for untrusted data
    function str(s: unknown): string {
        if (typeof s === "string") {
            return s;
        } else {
            throw new Error("Not a string");
        }
    }

    // The never type represents values that never occurs. For example, a function that always throws an error or a function that has an infinite loop can be typed with never.

    function error(message: string): never {
        throw new Error(message);
    }
}

{
    /** Type vs interface */

    type obj = {
        name: string,
        age: number
    }

    interface obj2 = {
        name: string,
        age: number
    }

    interface Window { myPlugin: boolean }
    interface Window { version: string }
    // Window now has both — merges automatically

    type Point = { x: number };
    type Point = { y: number }; // ❌ Error: duplicate identifier
}

{
    /** Union and Intersection */

    type union = string | number;

    function xyz(varibale: union) {
        if(typeof varibale === "string") {
            return variable.toUpperCase();
        } else {
            return variable;
        }
    }

    type hasName = {name: string};
    type hasAge = {age: number};

    type person = hasName & hasAge // Person = { name: string; age: number }

    let p: person = { name: "sai", age: 30 };
}

{
    /** Literal types and as const */

    type dir = "N" | "S" | "E" | "W";
    type dice = 1 | 2 | 3 | 4 | 5 | 6;
    type bool = true | false;

    // With as const — deeply readonly + literal types
    const config = { env: "prod", port: 3000 } as const;
    // config.env: "prod", config.port: 3000
    // config is now readonly — can't mutate it

}

{
    type User = {
        name: string;
        age?: number;  // number | undefined
    };

    const u: User = { name: "Chandan" }; // ✅ age is optional

    // Access carefully — use optional chaining
    console.log(u.age?.toFixed()); // won't crash if undefined

    // Optional function parameters
    function greet(name: string, title?: string) {
        return title ? `${title} ${name}` : name;
    }

    type Config = {
        readonly apiUrl: string;
        readonly version: number;
    };

    const cfg: Config = { apiUrl: "/api", version: 1 };
    cfg.apiUrl = "/v2"; // ❌ cannot assign to readonly property

    // Readonly array — no push/pop allowed
    const nums: ReadonlyArray<number> = [1, 2, 3];
    nums.push(4); // ❌ property 'push' does not exist
}