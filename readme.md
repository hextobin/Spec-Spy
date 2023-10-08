# Spec-Spy

## Overview

Spec-Spy is a testing utility to extend Jest with a custom matcher. With Spec-Spy, you can easily validate that your functions match your API spec as described in an exposed Swagger/OpenAPI document. This library supports both JSON and YAML formats.

## Features

- Validate functions against Swagger/OpenAPI specs.
- Supports both JSON and YAML Swagger/OpenAPI documents.
- Easy to integrate with Jest.
- Supports: get, head, post, put, delete, connect, options, trace, patch, and query HTTP verbs.

## Dependencies

- `js-yaml` as a direct dependency for handling YAML formats.
- `jest` as a peer dependency for extending its functionality.

## Installation

To install Spec-Spy, run the following command in your terminal:

```bash
npm install spec-spy
```

## Usage

### Use in Tests

Here's an example of how to use Spec-Spy in your Jest tests:

```typescript
import { getPet, postPet } from "pet";
import * as specSpy from "spec-spy";

let spec; // Object

describe("Pet functions", () => {
  beforeAll(async () => {
    spec = await specSpy.SpecSpySetup("https://api.example.com/swagger.json"); // or .../swagger.yaml
  });

  test("are in spec ", () => {
    expect(getPet).toBeApiIn(spec);
    expect(postPet).toBeApiIn(spec);
    // ... more test functions
  });
});
```

## Query Matching

### Overview

Spec-Spy has a unique feature that allows you to validate functions intended for querying data. This is particularly useful for POST routes in your Swagger/OpenAPI spec that are not conventional CRUD operations. The method is prefixed with "query" to indicate its special nature.

### How It Works

When you define a function with the name prefixed by "query," such as `queryPet`, Spec-Spy looks for a corresponding POST route in the Swagger/OpenAPI spec. For example, with a function named `queryPet`, Spec-Spy expects to find a POST route with the path `/queryPet` in the spec.

### Example Usage

Here's how you can define and test a "query" function:

```typescript
const queryPet = () => {
  // Your implementation here
};

// In your test file
describe("Query functions", () => {
  test("are in spec", () => {
    expect(queryPet).toBeApiIn(spec);
  });
});
```

### Future-Proofing

Spec-Spy is designed to adapt to future changes in HTTP methods or API guidelines. If the "query" verb is ever officially adopted, either by the IETF or within your organization's API guidelines, Spec-Spy will automatically look for a "query" verb in the spec. Your existing tests will remain valid without any changes.

For instance, if the "query" verb becomes official, Spec-Spy would then look for a "query" verb under `/Pet` in your Swagger/OpenAPI spec, while still recognizing `/queryPet` POST routes for backward compatibility.

```typescript
// Your test remains the same before and after IETF adoption
describe("Query functions", () => {
  test("are in spec", () => {
    expect(queryPet).toBeApiIn(spec);
  });
});
```

## API Reference

### `toBeApiIn`

This is a custom Jest matcher that validates a function against an API specification.

```typescript
expect(testFunction.getPet).toBeApiIn(spec);
```

### `SpecSpySetup`

Utility function to set up Spec-Spy with a Swagger/OpenAPI document.

```typescript
const spec = await specSpy.SpecSpySetup("http://localhost:3000/swagger.json");
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

MIT © Spencer Brooks

---
