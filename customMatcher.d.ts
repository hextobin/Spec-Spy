// Explicitly mark this file as a module to avoid errors in TypeScript.
// This is useful in files that might not have any other imports or exports.
export {};

// Extend the global TypeScript declarations
declare global {
  // Extend the Jest global namespace
  namespace jest {
    // Extend Jest's Matchers interface
    interface Matchers<R> {
      /**
       * Custom Jest matcher to verify if a given function is defined as an API
       * in a provided spec object.
       * @param spec - The spec object against which to check the function
       * @returns The result of the match (passed or failed)
       */
      toBeApiIn(spec: Object): R;
    }
  }
}
