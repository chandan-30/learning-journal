/**
 * JavaScript Modules and Build Tooling - Interview Prep
 *
 * This file covers module systems, bundling, and the modern JavaScript toolchain—
 * essential topics for understanding how production applications are built and deployed.
 *
 * Key concepts:
 *
 * 1. Module Systems: CommonJS (CJS) vs ECMAScript Modules (ESM)
 *    - CJS: Node.js standard. Uses require() for imports and module.exports for exports.
 *    - ESM: JavaScript standard. Uses import/export syntax. Enable with "type": "module" in package.json.
 *    - Key difference: ESM is statically analyzable, allowing tree shaking and better optimization.
 *    - CJS is runtime-based; dynamic require() makes static analysis impossible.
 *
 * 2. Named exports vs Default exports
 *    - Named exports: export multiple values; import with destructuring (import { x } from '...').
 *    - Default exports: export a single value; import without braces (import x from '...').
 *    - You can mix both in one module (named + one default).
 *
 * 3. Dynamic imports
 *    - Use import() to load modules at runtime, not at parse time.
 *    - Enables code splitting and lazy loading (e.g., React.lazy).
 *    - Reduces initial bundle size by deferring non-critical module loads.
 *
 * 4. Module bundlers (Webpack, Rollup, Vite, esbuild)
 *    - Take multiple source files (JS, CSV, fonts, images) as input.
 *    - Combine and optimize code into output bundles for production.
 *    - Add hash versioning to filenames for effective cache busting.
 *    - Create code-split chunks from dynamic imports for on-demand loading.
 *    - Smaller bundles = faster downloads and app startup.
 *
 * 5. Transpilers (Babel, TypeScript compiler)
 *    - Convert modern JavaScript/TypeScript into browser-compatible code.
 *    - Essential for supporting older browsers while writing modern syntax.
 *    - TypeScript: adds static type checking plus transpilation.
 *
 * 6. NPM and package.json
 *    - package.json defines project metadata, dependencies, and scripts.
 *    - Use npm install to fetch exact versions locked in package-lock.json.
 *    - npm scripts (dev, build, test, etc.) automate common tasks.
 *    - Semantic versioning (semver): MAJOR.MINOR.PATCH (e.g., 1.2.3).
 *      * ~1.2.3 allows patches, ^1.2.3 allows minor and patch versions.
 *
 * 7. Package-lock.json
 *    - Locks exact versions of dependencies and their nested dependencies.
 *    - Ensures reproducible installs across machines and CI/CD environments.
 *    - Commit to version control so all developers use the same versions.
 *
 * Interview tips:
 *    - Explain why ESM is better than CJS for bundling (static analysis, tree shaking).
 *    - Clarify when to use named vs default exports.
 *    - Describe how dynamic imports improve performance through code splitting.
 *    - Know the role of bundlers in optimizing production builds.
 *    - Understand how package-lock.json prevents version drift.
 */

{
    // CJS vs ESM
    // CJS (CommonJS) is the module system used in Node.js, while ESM (ECMAScript Modules) is the standard module system in JavaScript. CJS uses require() and module.exports, while ESM uses import and export statements. ESM supports static analysis and tree shaking, while CJS does not.

    const name = "sai";
    const age = 28;
    module.exports = { name, age }; // CJS export

    // In ESM, we would use:
    // export const name = "sai";
    // export const age = 28;
    // export { name, age };

    // In CJS, we would import using:
    // const { name, age } = require('./module');
    // In ESM, we would import using:
    // import { name, age } from './module.js';
}

{
    // Named exports vs default exports
    // Named exports allow you to export multiple values from a module, while default exports allow you to export a single value as the default export of the module. Named exports are imported using curly braces, while default exports can be imported without curly braces.

    // CJS does not have a concept of default exports, but we can simulate it by exporting a single value:
    module.exports = function() {
        console.log("This is the default export");
    };

    // In ESM, we would use:
    // export default function() {
    //     console.log("This is the default export");
    // }

    // In CJS, we would import the default export using:
    // const defaultExport = require('./module');
    // In ESM, we would import the default export using:
    // import defaultExport from './module.js';
}

{
    // Dynamic imports

    // Dynamic imports allow you to import modules on demand, rather than at the top of the file. This can be useful for code splitting and lazy loading. In ESM, we can use the import() function to dynamically import a module.

    const {heavy} = await import('./heavy-module.js'); // dynamically import the heavy module when needed

    // use case - mostly used in react lazy loading of components

    const component = lazy(() => import('./heavy-component'));

}

{
    // Module bundlers and transpilers

    /**
     * Bndlers takes inout from source files(js, css, Images) and outputs the optimised files so that browser loads them efficiently
        * Typically takes index.html or main.js as entry point for bundling
        * Creates Bundles and stores them inside dist/. folder with hash versioning for cache bursting
        * Chunks will be created for dynamic imports so they can be loaded on demand
        * Transpilers loads languages such as Typescript into browser understandle lang
     */
}

{
    // NPM - packae.json, scripts and semver
}

{
    // Package-lock.json file importance
}