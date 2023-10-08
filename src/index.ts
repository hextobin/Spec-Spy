export { SpecSpySetup } from "./utils";

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

expect.extend({
  // Custom Jest matcher function for API specification
  toBeApiIn(received: Function, spec: Record<string, any>) {
    // Extract paths from the Swagger/OpenAPI spec
    const paths: Record<string, any> = spec.paths;

    // Parse the received function name to get the HTTP method and path segment
    // For example, 'getPet' will be split into 'get' and 'Pet'
    const [method, pathSegment] = received.name
      .split(/(?=[A-Z])/) // Split the string at uppercase letters
      .map((s) => s.toLowerCase()); // Convert to lowercase
    const path = `/${pathSegment}`; // Construct path string

    // Check if it's a "query" API (custom query type)
    // The function name matches a POST route in the spec
    const isQueryAPI =
      method === "query" &&
      paths.hasOwnProperty(`/${received.name}`) &&
      paths[`/${received.name}`].hasOwnProperty("post");

    // Check if it's another type of API
    // The path and method should exist in the spec
    const isOtherAPI =
      paths.hasOwnProperty(path) && paths[path].hasOwnProperty(method);

    // Combine checks: it's an API if either check succeeds
    const isAPI = isQueryAPI || isOtherAPI;

    // Return the result along with the custom message
    return {
      message: () =>
        `expected ${received} ${isAPI ? "not " : ""}to be an API function`,
      pass: isAPI,
    };
  },
});

// Export an empty object to keep this as a module
export {};
