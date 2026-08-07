/**
 * TYPESCRIPT — UTILITY TYPES
 * ===========================
 * Quick-reference for interview prep. Each utility type transforms an existing
 * type into a new one — no runtime cost, compile-time only.
 *
 * CONCEPTS COVERED
 * ─────────────────
 *
 * 1. PARTIAL<T> / REQUIRED<T> / READONLY<T>  — modify property modifiers
 *    - Partial<T>:  every property becomes optional  (adds `?`)
 *    - Required<T>: every property becomes mandatory (removes `?`)
 *    - Readonly<T>: every property becomes read-only (prevents reassignment)
 *    - Interview rule: Partial is the most common — used for update/patch
 *      payloads where you only send the fields that changed.
 *
 * 2. PICK<T,K> / OMIT<T,K> / RECORD<K,V>  — shape/key manipulation
 *    - Pick<T,K>:   keep ONLY the listed keys from T
 *    - Omit<T,K>:   keep everything EXCEPT the listed keys
 *    - Record<K,V>: build an object type with keys K and values V
 *    - Interview rule: Pick and Omit are mirrors of each other — use Pick when
 *      you want a small subset, Omit when you want to drop one or two keys.
 *
 * 3. EXCLUDE<T,U> / EXTRACT<T,U> / NONNULLABLE<T>  — union filtering
 *    - Exclude<T,U>:    remove members of U from union T
 *    - Extract<T,U>:    keep ONLY members of T that are also in U
 *    - NonNullable<T>:  remove null and undefined from T
 *    - Key rule: these work on UNION types, not object types.
 *      (Pick/Omit work on object keys; Exclude/Extract work on union members)
 *
 * 4. RETURNTYPE<F> / PARAMETERS<F> / INSTANCETYPE<C>  — function/class inference
 *    - ReturnType<F>:   the type a function returns
 *    - Parameters<F>:   a tuple of the function's parameter types
 *    - InstanceType<C>: the type of an instance created by `new C()`
 *    - Interview rule: these are how you extract types FROM existing code without
 *      duplicating type definitions — especially useful with third-party code.
 *
 * 5. IMPLEMENTING PARTIAL AND PICK FROM SCRATCH
 *    - Both use mapped types under the hood: `[K in keyof T]: ...`
 *    - Understanding this shows you how ALL utility types are built —
 *      they are not magic, just mapped/conditional types with clever constraints.
 */

type User = {
    id: number;
    name: string;
    email: string;
    age?: number;
};


// ─────────────────────────────────────────────────────────────────────────────
// 1. Partial<T> / Required<T> / Readonly<T>
// ─────────────────────────────────────────────────────────────────────────────
{
    // Partial — every field becomes optional. Common for PATCH/update payloads.
    function updateUser(id: number, changes: Partial<User>) {
        console.log(id, changes);
    }
    updateUser(1, { name: "Sai" });           // ✅ only send what changed
    updateUser(1, { name: "Sai", age: 30 });  // ✅ multiple fields

    // Required — strips all `?`, every field is now mandatory
    type StrictUser = Required<User>;
    // { id: number; name: string; email: string; age: number }  — age no longer optional

    // Readonly — prevents mutation after creation
    const user: Readonly<User> = { id: 1, name: "Sai", email: "s@s.com" };
    // user.name = "Chandan"; // ❌ cannot assign to readonly property
}


// ─────────────────────────────────────────────────────────────────────────────
// 2. Pick<T,K> / Omit<T,K> / Record<K,V>
// ─────────────────────────────────────────────────────────────────────────────
{
    // Pick — keep only the fields you need (e.g. for a public-facing response)
    type UserPreview = Pick<User, "id" | "name">;
    // { id: number; name: string }

    const preview: UserPreview = { id: 1, name: "Sai" };

    // Omit — drop sensitive/internal fields
    type PublicUser = Omit<User, "email">;
    // { id: number; name: string; age?: number }

    // Record — build a lookup map with typed keys and values
    type Role = "admin" | "editor" | "viewer";
    const permissions: Record<Role, boolean> = {
        admin: true,
        editor: true,
        viewer: false,
    };
}


// ─────────────────────────────────────────────────────────────────────────────
// 3. Exclude<T,U> / Extract<T,U> / NonNullable<T>
// ─────────────────────────────────────────────────────────────────────────────
{
    type Status = "active" | "inactive" | "banned" | "pending";

    // Exclude — remove specific members from a union
    type AllowedStatus = Exclude<Status, "banned">;
    // "active" | "inactive" | "pending"

    // Extract — keep only matching members
    type LiveStatus = Extract<Status, "active" | "pending">;
    // "active" | "pending"

    // NonNullable — remove null and undefined (common after API calls)
    type MaybeString = string | null | undefined;
    type DefiniteString = NonNullable<MaybeString>;
    // string
}


// ─────────────────────────────────────────────────────────────────────────────
// 4. ReturnType<F> / Parameters<F> / InstanceType<C>
// ─────────────────────────────────────────────────────────────────────────────
{
    function createSession(userId: number, role: string) {
        return { token: "abc", userId, role, createdAt: new Date() };
    }

    // ReturnType — derive the return type without duplicating it
    type Session = ReturnType<typeof createSession>;
    // { token: string; userId: number; role: string; createdAt: Date }

    // Parameters — derive the parameter types as a tuple
    type CreateSessionArgs = Parameters<typeof createSession>;
    // [userId: number, role: string]

    // useful for wrapping a function with the exact same signature
    function loggedCreateSession(...args: Parameters<typeof createSession>) {
        console.log("Creating session for user", args[0]);
        return createSession(...args);
    }

    // InstanceType — get the instance type from a class constructor
    class AuthService {
        login(email: string) { return `${email} logged in`; }
    }

    type AuthServiceInstance = InstanceType<typeof AuthService>;
    // AuthService  — the type you get from `new AuthService()`

    // Useful when a class is passed around as a value
    function create<T>(Cls: new () => T): T {
        return new Cls();
    }
    const auth = create(AuthService); // type: AuthService
}


// ─────────────────────────────────────────────────────────────────────────────
// 5. Implementing Partial and Pick from scratch
// ─────────────────────────────────────────────────────────────────────────────
{
    // Partial: iterate every key of T, make it optional
    type MyPartial<T> = {
        [K in keyof T]?: T[K];
        //           ^ the only difference from a plain copy is the `?`
    };

    type PartialUser = MyPartial<User>;
    // { id?: number; name?: string; email?: string; age?: number }

    // Pick: iterate only the keys the caller listed, keep their value types
    type MyPick<T, K extends keyof T> = {
        [P in K]: T[P];
        // K extends keyof T ensures you can't pick a key that doesn't exist
    };

    type UserPreview = MyPick<User, "id" | "name">;
    // { id: number; name: string }

    // MyPick<User, "phone"> // ❌ "phone" is not a key of User
}
