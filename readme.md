# SpecSpy: Your Friendly Neighborhood Swagger Watchdog 🐾

## Overview

Welcome to SpecSpy! This is your go-to utility for making sure your frontend calls and your Swagger or OpenAPI specs are BFFs. 🤝 Written in TypeScript, it's like the spellchecker for your API calls.

## Features

- 📚 **Type Safety**: Goodbye type errors, hello TypeScript!
- 🤖 **Swagger/OpenAPI Compatible**: Whether you're a YAML Yoda or a JSON Jedi, we've got you covered.
- 🎭 **Custom Jest Matchers**: Make your test suites read like Shakespearean drama (but easier to understand).
- 🌍 **HTTP/HTTPS**: We speak both dialects.

## Installation

Let's kick things off with some essentials:

```bash
npm install jest typescript js-yaml
```

## Usage

### Initialization

First, introduce your code to `SpecSpySetup`:

```typescript
import { SpecSpySetup } from "path/to/SpecSpy";
```

### Pre-Game Warm-Up

Before diving into tests, let's pull in that Swagger or OpenAPI spec:

```typescript
let apiSpec: Record<string, any>;

beforeAll(async () => {
  apiSpec = await SpecSpySetup("https://path/to/swagger.yaml");
});
```

### Run the Tests

Your test suite gets a little more eloquent with our custom Jest matcher `toBeApiIn`:

```typescript
test("Does getUser API exist?", () => {
  expect(getUser).toBeApiIn(apiSpec);
});
```

## Contributing

Got thoughts? A haiku of code improvements? 🌸 Open a PR, but do glance at those contributing guidelines, will ya?

## License

MIT Licensed. For the finer print, take a look at the `LICENSE` file.

## Contact & Support

Questions, queries, quandaries? Open an issue or reach out. We're all 👂.

Bring SpecSpy into your project and make your APIs harmonize like a boy band. 🎵
