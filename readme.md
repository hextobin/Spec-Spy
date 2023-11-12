# Spec-Spy

## Overview

In the realm of software development, aligning application functions with API specifications and RESTful standards is a critical yet challenging task. This process is not only about meeting API schema requirements but also about adhering to RESTful naming conventions, which is essential for creating intuitive and maintainable APIs. Spec-Spy is designed to address these challenges by offering a seamless integration with Jest, enabling developers to ensure both specification compliance and RESTful standard adherence in their applications.

### Problem

Developers often struggle with two main issues when integrating their application functions with an API:

1. **Specification Compliance**: Ensuring that application functions strictly adhere to the defined API specifications, especially when using Swagger/OpenAPI documents. This compliance is crucial for maintaining consistency and reliability in software applications but can be labor-intensive and error-prone.

2. **RESTful Standards Adherence**: Maintaining RESTful standards in function naming and design, such as using semantically clear names like `getPet`, `postPet`, `putPet`, etc. This practice is vital for creating readable and easily understandable code but often gets overlooked in the complexity of development.

### Solution

Spec-Spy offers a comprehensive solution to these problems. As an extension to Jest, it allows developers to:

1. **Automatically Validate API Specification Compliance**: Spec-Spy validates that your functions match your API spec as described in Swagger/OpenAPI documents. It supports both JSON and YAML formats, ensuring broad compatibility and ease of use.

2. **Enforce RESTful Naming Conventions**: With Spec-Spy, functions are required to be named semantically, in line with RESTful standards. This feature encourages developers to follow best practices in API design, leading to more intuitive and maintainable codebases.

By automating these validation processes, Spec-Spy significantly reduces the time and effort involved in manual checks, while enhancing the accuracy and reliability of your application. It is easy to integrate with existing Jest environments and supports a wide range of HTTP verbs, making it a versatile and indispensable tool for modern development projects.

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
