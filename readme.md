# SpecSpy

## Overview

SpecSpy is a testing utility that extends Jest to provide custom matchers for API specification testing. With SpecSpy, you can easily validate that your functions match an API spec as described in Swagger/OpenAPI documents. The library supports both JSON and YAML formats.

## Features

- Validate functions against Swagger/OpenAPI specs.
- Supports both JSON and YAML Swagger/OpenAPI documents.
- Easy to integrate with Jest.
- Provides custom Jest matcher for API specification validation.

## Installation

To install SpecSpy, run the following command in your terminal:

```bash
npm install specspy
```

## Usage

### Setup SpecSpy in Your Jest Environment

First, import SpecSpy in your Jest setup file:

```typescript
import "specspy";
```

### Use in Tests

Here's an example of how to use SpecSpy in your Jest tests:

```typescript
import * as testFunction from "./fixtures/testFunctions";
import { SpecSpySetup } from "specspy";
import { startServer } from "./fixtures/testServer";

let spec: Object;
let server;

describe("JSON API url", () => {
  beforeAll(async () => {
    server = startServer();
    spec = await SpecSpySetup("http://localhost:3000/swagger.json");
  });

  afterAll(() => {
    server.close();
  });

  test("test functions are in spec ", () => {
    expect(testFunction.getPet).toBeApiIn(spec);
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

### `SpecSpySetup`

Utility function to set up SpecSpy with a Swagger/OpenAPI document.

```typescript
const spec = await SpecSpySetup("http://localhost:3000/swagger.json");
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

MIT © Your Name

---

This is just a basic README template. Feel free to customize it according to your needs.
