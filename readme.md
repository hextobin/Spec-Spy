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

## API Reference

### `toBeApiIn`

This is a custom Jest matcher that validates a function against an API specification.

```typescript
expect(testFunction.getPet).toBeApiIn(spec);
```

### `Spec-SpySetup`

Utility function to set up Spec-Spy with a Swagger/OpenAPI document.

```typescript
const spec = await specSpy.SpecSpySetup("http://localhost:3000/swagger.json");
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

MIT © Spencer Brooks

---
