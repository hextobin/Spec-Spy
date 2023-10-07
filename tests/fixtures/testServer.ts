import express from "express";
import * as swaggerUi from "swagger-ui-express";
import { readFileSync, readFile } from "fs";
import path from "path";
import { load } from "js-yaml";

// Load Swagger documentation from a YAML file
const swaggerDocument = load(
  readFileSync("tests/fixtures/testSwagger.yaml", "utf8")
);

// Function to start the server
export const startServer = (isYAML: boolean = false) => {
  // Initialize Express app and set port
  const app = express();
  const port = 3000;

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Conditional route for serving Swagger in YAML format
  if (isYAML) {
    app.get("/swagger.yaml", (req, res) => {
      res.setHeader("Content-Type", "application/yaml");
      res.send(swaggerDocument);
    });
  } else {
    // Route for serving Swagger in JSON format
    app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");

      // Construct the path to the JSON file
      const filePath = path.join("tests/fixtures/testSwagger.json");

      // Read the JSON file asynchronously
      readFile(filePath, "utf8", (err, data) => {
        // Handle errors
        if (err) {
          res.status(500).send("File not found");
          return;
        }
        // Send JSON content as response
        res.send(data);
      });
    });
  }

  // Sample pet routes for demonstration purposes
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

  // Start the Express server
  const server = app.listen(port, () => {
    console.log(
      `SpecSpy internal tests' server running at http://localhost:${port}`
    );
  });

  // Return the server instance for further use
  return server;
};
