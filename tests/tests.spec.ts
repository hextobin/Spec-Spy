import "../src/index";
import * as testFunction from "./fixtures/testFunctions";
import { SpecSpySetup } from "../src/utils";
import { startServer } from "./fixtures/testServer";
import { Server, IncomingMessage, ServerResponse } from "http";

let spec: Object;
let server: Server<typeof IncomingMessage, typeof ServerResponse>;

describe("Function tests", () => {
  test("Imported functions are typeof function", () => {
    expect(typeof testFunction.getPet).toEqual("function");
    expect(typeof testFunction.headPet).toEqual("function");
    expect(typeof testFunction.postPet).toEqual("function");
    expect(typeof testFunction.putPet).toEqual("function");
    expect(typeof testFunction.deletePet).toEqual("function");
    expect(typeof testFunction.connectPet).toEqual("function");
    expect(typeof testFunction.optionsPet).toEqual("function");
    expect(typeof testFunction.tracePet).toEqual("function");
    expect(typeof testFunction.patchPet).toEqual("function");
    expect(typeof testFunction.queryPet).toEqual("function");
  });
});

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
    expect(testFunction.headPet).toBeApiIn(spec);
    expect(testFunction.postPet).toBeApiIn(spec);
    expect(testFunction.putPet).toBeApiIn(spec);
    expect(testFunction.deletePet).toBeApiIn(spec);
    expect(testFunction.connectPet).toBeApiIn(spec);
    expect(testFunction.optionsPet).toBeApiIn(spec);
    expect(testFunction.tracePet).toBeApiIn(spec);
    expect(testFunction.patchPet).toBeApiIn(spec);
    expect(testFunction.queryPet).toBeApiIn(spec);
  });
});

describe("YAML API url", () => {
  beforeAll(async () => {
    server = startServer(true);
    spec = await SpecSpySetup("http://localhost:3000/swagger.yaml");
  });

  afterAll(() => {
    server.close();
  });

  test("test functions are in spec ", () => {
    expect(testFunction.getPet).toBeApiIn(spec);
    expect(testFunction.headPet).toBeApiIn(spec);
    expect(testFunction.postPet).toBeApiIn(spec);
    expect(testFunction.putPet).toBeApiIn(spec);
    expect(testFunction.deletePet).toBeApiIn(spec);
    expect(testFunction.connectPet).toBeApiIn(spec);
    expect(testFunction.optionsPet).toBeApiIn(spec);
    expect(testFunction.tracePet).toBeApiIn(spec);
    expect(testFunction.patchPet).toBeApiIn(spec);
    expect(testFunction.queryPet).toBeApiIn(spec);
  });
});
