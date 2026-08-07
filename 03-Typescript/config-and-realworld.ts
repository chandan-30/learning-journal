/**
 * TYPESCRIPT — CONFIG & REAL-WORLD USAGE
 * ========================================
 * Quick-reference for interview prep. These are the practical, project-level
 * topics that come up in senior interviews and code reviews.
 *
 * CONCEPTS COVERED
 * ─────────────────
 *
 * 1. tsconfig.json — KEY COMPILER OPTIONS
 *    - strict: enables a bundle of safety checks all at once. Always turn this on.
 *      Includes: strictNullChecks, noImplicitAny, strictFunctionTypes, and more.
 *    - target: what JS version to compile DOWN to ("ES2020", "ESNext", etc.).
 *      Match this to your runtime environment (Node version, browser support).
 *    - lib: which built-in type definitions to include ("DOM", "ES2022", etc.).
 *      If `lib` is omitted, TS picks defaults based on `target`.
 *    - moduleResolution: how TS resolves `import` paths.
 *      "bundler" for Vite/esbuild; "node16" / "nodenext" for modern Node.
 *    - paths: set up import aliases so `@/components/Button` resolves to
 *      `src/components/Button` — avoids deep relative paths like `../../..`.
 *    - Interview rule: know that tsconfig does NOT affect runtime — it only
 *      controls the compiler. The bundler/runtime is a separate concern.
 *
 * 2. DECLARATION FILES — .d.ts
 *    - A .d.ts file contains ONLY types — no runtime code. It tells TS what
 *      types a JS module exposes without shipping the implementation.
 *    - Module augmentation: add new properties to an existing module's types
 *      (e.g. add a method to Express `Request`).
 *    - Global augmentation: add to the global scope (e.g. `window.myPlugin`).
 *    - Interview rule: you write a .d.ts when you have a JS library with no
 *      types, or when you need to extend a library's existing types.
 *
 * 3. @types/* PACKAGES — DefinitelyTyped
 *    - Many JS libraries ship without TypeScript types. The community publishes
 *      them separately as `@types/lodash`, `@types/node`, etc.
 *    - When types ARE bundled: the package.json has a `"types"` or `"typings"`
 *      field pointing to its own .d.ts — no @types package needed.
 *    - Install as devDependency: `npm i -D @types/lodash` (only needed at
 *      compile time, not at runtime).
 *    - Interview rule: if a library has its own types, @types/* is redundant.
 *      Check the npm package for a `types` field before installing @types.
 *
 * 4. TYPESCRIPT WITH REACT
 *    - Props: type them with an interface; use `React.FC<Props>` or the more
 *      common inline `(props: Props) => JSX.Element` form.
 *    - Events: React has its own event types — `React.MouseEvent`,
 *      `React.ChangeEvent<HTMLInputElement>`, etc. Don't use the DOM's `Event`.
 *    - Refs: `useRef<HTMLInputElement>(null)` — the generic tells TS what the
 *      ref will be attached to, unlocking `.current.focus()` etc.
 *    - Hooks: useState infers from the initial value; supply a generic when the
 *      initial value is null/undefined — `useState<User | null>(null)`.
 *    - Generic components: components can take type parameters just like
 *      functions — useful for list/table components that work with any data.
 *    - Interview rule: event handler types are a very common interview question.
 *      Know `React.ChangeEvent<HTMLInputElement>` and `React.FormEvent`.
 */


// ─────────────────────────────────────────────────────────────────────────────
// 1. tsconfig.json
// ─────────────────────────────────────────────────────────────────────────────

/*
{
  "compilerOptions": {
    // Safety
    "strict": true,               // enables all strict checks — always on

    // Output target
    "target": "ES2020",           // compile down to this JS version
    "lib": ["ES2020", "DOM"],     // built-in type definitions to include

    // Module resolution
    "module": "ESNext",
    "moduleResolution": "bundler", // use "node16" for Node, "bundler" for Vite

    // Path aliases  — avoids ../../../components
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true           // emit .d.ts files alongside JS output
  }
}
*/

// How paths aliases work at a glance:
//   import Button from "@/components/Button"
//     → resolves to src/components/Button.ts
//
// Note: tsconfig `paths` only affects the TS compiler.
// Your bundler (Vite, webpack) needs its own alias config to match.


// ─────────────────────────────────────────────────────────────────────────────
// 2. DECLARATION FILES — .d.ts
// ─────────────────────────────────────────────────────────────────────────────

// --- custom.d.ts (your own declarations) -----------------------------------
//
// Typing a JS module that has no types:
//
//   declare module "some-untyped-lib" {
//     export function doThing(x: string): number;
//     export const version: string;
//   }
//
// Typing a static asset import (e.g. in a Vite project):
//
//   declare module "*.svg" {
//     const src: string;
//     export default src;
//   }


// --- express.d.ts (module augmentation) ------------------------------------
//
// Add a `user` property to Express's Request object:
//
//   import "express";                   // must import the module first
//
//   declare module "express" {
//     interface Request {
//       user?: { id: string; role: string };
//     }
//   }
//
// After this, `req.user` is typed everywhere — no casting needed.


// --- globals.d.ts (global augmentation) ------------------------------------
//
// Add a property to the browser's `window` object:
//
//   declare global {
//     interface Window {
//       analytics: { track(event: string): void };
//     }
//   }
//   export {};   // makes this file a module — required for `declare global`


// ─────────────────────────────────────────────────────────────────────────────
// 3. @types/* PACKAGES
// ─────────────────────────────────────────────────────────────────────────────

// Install types for a library that doesn't bundle them:
//   npm i -D @types/lodash
//   npm i -D @types/node

// How to tell if a package already has bundled types:
//   1. Check node_modules/package-name/package.json for a "types" or "typings" field
//   2. Check if there's an index.d.ts in the package root
//   If either exists → bundled types, no @types needed.

// Examples:
//   axios       → ships its own types (no @types/axios needed)
//   lodash      → no bundled types → needs @types/lodash
//   react       → no bundled types → needs @types/react


// ─────────────────────────────────────────────────────────────────────────────
// 4. TYPESCRIPT WITH REACT
// ─────────────────────────────────────────────────────────────────────────────

// These are .tsx examples — shown as comments so this file stays valid .ts

// --- Typing props -----------------------------------------------------------
//
//   interface ButtonProps {
//     label: string;
//     onClick: () => void;
//     disabled?: boolean;        // optional prop
//   }
//
//   function Button({ label, onClick, disabled }: ButtonProps) {
//     return <button onClick={onClick} disabled={disabled}>{label}</button>;
//   }


// --- Typing events ----------------------------------------------------------
//
//   function SearchInput() {
//     function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//       console.log(e.target.value);
//     }
//
//     function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//       e.preventDefault();
//     }
//
//     return (
//       <form onSubmit={handleSubmit}>
//         <input onChange={handleChange} />
//       </form>
//     );
//   }


// --- Typing refs ------------------------------------------------------------
//
//   function FocusInput() {
//     const inputRef = useRef<HTMLInputElement>(null);
//     // inputRef.current is HTMLInputElement | null
//     // TS forces you to null-check before using it
//
//     function focus() {
//       inputRef.current?.focus();
//     }
//
//     return <input ref={inputRef} />;
//   }


// --- Typing useState --------------------------------------------------------
//
//   type User = { id: number; name: string };
//
//   function Profile() {
//     // TS infers string from the initial value
//     const [name, setName] = useState("Sai");
//
//     // Initial value is null — must supply the generic
//     const [user, setUser] = useState<User | null>(null);
//
//     return <div>{user?.name ?? "loading..."}</div>;
//   }


// --- Generic component ------------------------------------------------------
//
//   interface ListProps<T> {
//     items: T[];
//     renderItem: (item: T) => React.ReactNode;
//   }
//
//   function List<T>({ items, renderItem }: ListProps<T>) {
//     return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>;
//   }
//
//   // Usage — T is inferred from `items`
//   <List items={["a", "b", "c"]} renderItem={(s) => s.toUpperCase()} />
//   <List items={[{ id: 1, name: "Sai" }]} renderItem={(u) => u.name} />
