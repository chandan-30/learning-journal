/**
 * TYPESCRIPT — NARROWING & TYPE GUARDS
 * ======================================
 * Quick-reference for interview prep. Narrowing is how TypeScript figures out
 * a more specific type inside a block based on runtime checks you write.
 *
 * CONCEPTS COVERED
 * ─────────────────
 *
 * 1. NARROWING WITH typeof / instanceof / in
 *    - typeof: narrows primitives — "string" | "number" | "boolean" | "object" etc.
 *    - instanceof: narrows class instances — works with `new` constructors.
 *    - in: narrows by checking if a property key exists on an object.
 *    - Key rule: after each check, TS knows the exact type inside that branch —
 *      you unlock methods/properties specific to that type without casting.
 *
 * 2. TYPE PREDICATES — the `is` keyword
 *    - A function whose return type is `arg is SomeType` acts as a custom
 *      type guard: when it returns true, TS narrows the caller's type.
 *    - Syntax: function isX(val: unknown): val is X { ... }
 *    - Key rule: you take responsibility for the runtime check being correct.
 *      TS trusts the predicate — a wrong implementation will silence real bugs.
 *    - Interview use-case: validate unknown API responses, filter typed arrays.
 *
 * 3. DISCRIMINATED UNIONS — type-safe branching
 *    - A union of objects where each member shares one literal property (the
 *      "discriminant") with a unique value — e.g. `kind: "circle"`.
 *    - TS uses the discriminant to narrow to the exact variant inside each branch.
 *    - Key rule: every variant MUST have the discriminant property. Without it,
 *      TS cannot distinguish the branches and won't narrow.
 *    - Interview rule: this is the idiomatic TS pattern for modelling state
 *      machines, API results, and Redux actions.
 *
 * 4. EXHAUSTIVE CHECKING WITH never
 *    - In the `default` branch of a switch over a discriminated union, assign
 *      the value to `never`. If a new variant is added later without updating
 *      the switch, TS raises a compile-time error — not a runtime surprise.
 *    - Key rule: this is a zero-runtime-cost safety net. The `assertNever`
 *      helper throws at runtime too, giving you a double safety net.
 *    - Interview rule: shows you understand that `never` = "this should be
 *      unreachable" and how to turn that into a compiler guarantee.
 */


// ─────────────────────────────────────────────────────────────────────────────
// 1. typeof / instanceof / in
// ─────────────────────────────────────────────────────────────────────────────
{
    // typeof — narrows primitive types
    function format(value: string | number): string {
        if (typeof value === "string") {
            return value.toUpperCase();  // TS knows: string here
        }
        return value.toFixed(2);        // TS knows: number here
    }

    // instanceof — narrows class instances
    function describe(err: Error | string): string {
        if (err instanceof Error) {
            return err.message;  // TS knows: Error here
        }
        return err;              // TS knows: string here
    }

    // in — narrows by checking for the presence of a property
    type Cat = { meow: () => void };
    type Dog = { bark: () => void };

    function makeSound(animal: Cat | Dog): void {
        if ("meow" in animal) {
            animal.meow();  // TS knows: Cat here
        } else {
            animal.bark();  // TS knows: Dog here
        }
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// 2. TYPE PREDICATES — x is T
// ─────────────────────────────────────────────────────────────────────────────
{
    // Without a predicate, the return type is just `boolean` — TS won't narrow
    // With `x is string`, TS narrows the caller's type when this returns true
    function isString(x: unknown): x is string {
        return typeof x === "string";
    }

    function print(value: unknown): void {
        if (isString(value)) {
            console.log(value.toUpperCase());  // TS knows: string here
        }
    }

    // Practical use: filter a mixed array to a specific type
    const values: (string | number)[] = ["a", 1, "b", 2];
    const strings = values.filter((v): v is string => typeof v === "string");
    // strings: string[]  — not (string | number)[]
}


// ─────────────────────────────────────────────────────────────────────────────
// 3. DISCRIMINATED UNIONS
// ─────────────────────────────────────────────────────────────────────────────
{
    // Each shape has a unique literal `kind` — that's the discriminant
    type Circle    = { kind: "circle";    radius: number };
    type Rectangle = { kind: "rectangle"; width: number; height: number };
    type Triangle  = { kind: "triangle";  base: number;  height: number };

    type Shape = Circle | Rectangle | Triangle;

    function area(shape: Shape): number {
        switch (shape.kind) {
            case "circle":
                return Math.PI * shape.radius ** 2;  // TS knows: Circle
            case "rectangle":
                return shape.width * shape.height;   // TS knows: Rectangle
            case "triangle":
                return 0.5 * shape.base * shape.height; // TS knows: Triangle
        }
    }

    console.log(area({ kind: "circle", radius: 5 }));
}


// ─────────────────────────────────────────────────────────────────────────────
// 4. EXHAUSTIVE CHECKING WITH never
// ─────────────────────────────────────────────────────────────────────────────
{
    // If you add a new variant to Shape but forget to handle it in the switch,
    // the `default` branch receives a value whose type is no longer `never` —
    // TS raises a compile error telling you exactly what you missed.

    function assertNever(x: never): never {
        throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
    }

    type Shape =
        | { kind: "circle";    radius: number }
        | { kind: "rectangle"; width: number; height: number };

    function area(shape: Shape): number {
        switch (shape.kind) {
            case "circle":
                return Math.PI * shape.radius ** 2;
            case "rectangle":
                return shape.width * shape.height;
            default:
                // If a new variant is added and not handled above,
                // `shape` is no longer `never` here — TS flags it as an error
                return assertNever(shape);
        }
    }
}
