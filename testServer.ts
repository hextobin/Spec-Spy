import express from "express";
import * as swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { load } from "js-yaml";

// Using js-yaml to load the YAML file
const swaggerDocument = load(readFileSync("./testSwagger.yaml", "utf8"));

export const startServer = (isYAML: boolean = false) => {
  const app = express();
  const port = 3000;

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // expose the swagger file
  if (isYAML) {
    app.get("/swagger.yaml", (req, res) => {
      res.setHeader("Content-Type", "application/yaml");
      res.send(readFileSync("./testSwagger.yaml", "utf8"));
    });
  } else {
    app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(swaggerDocument));
    });
  }

  app.get("/pet", (req, res) => res.send("GET /pet"));
  app.head("/pet", (req, res) => res.send("HEAD /pet"));
  app.post("/pet", (req, res) => res.send("POST /pet"));
  app.put("/pet", (req, res) => res.send("PUT /pet"));
  app.delete("/pet", (req, res) => res.send("DELETE /pet"));
  app.connect("/pet", (req, res) => res.send("CONNECT /pet"));
  app.options("/pet", (req, res) => res.send("OPTIONS /pet"));
  app.trace("/pet", (req, res) => res.send("TRACE /pet"));
  app.patch("/pet", (req, res) => res.send("PATCH /pet"));
  app.post("/queryPet", (req, res) => res.send("POST /queryPet"));

  const server = app.listen(port, () => {
    console.log(
      `SpecSpy internal tests' server running at http://localhost:${port}`
    );
  });

  return server;
};
