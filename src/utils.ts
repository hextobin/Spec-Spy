import { load } from "js-yaml";
import http, { IncomingMessage } from "http";
import https from "https";

// Define Protocol type as either HTTP or HTTPS
type Protocol = typeof http | typeof https;

// Function to fetch data from a given URL using either HTTP or HTTPS
export const fetchData = async (
  url: string,
  protocol: Protocol
): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    const chunks: string[] = []; // Store received data chunks

    // Initiate GET request
    protocol
      .get(url, (response: IncomingMessage) => {
        // Handle incoming data chunks
        response.on("data", (chunk: string) => {
          chunks.push(chunk);
        });

        // Handle end of response
        response.on("end", () => {
          const data = chunks.join(""); // Combine all chunks
          try {
            // Parse data according to its type (YAML or JSON)
            const result = url.endsWith(".yaml")
              ? load(data)
              : JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse the data: ${error.message}`));
          }
        });
      })
      .on("error", reject); // Handle errors
  });
};

// Function to get specification sheet based on given address
export const getSpecsheet = async (
  address: string
): Promise<Record<string, any>> => {
  // Determine protocol based on address prefix
  const protocol = address.startsWith("https://")
    ? https
    : address.startsWith("http://")
    ? http
    : null;

  if (protocol) {
    return fetchData(address, protocol);
  }

  throw new Error("Unsupported protocol in the Swagger address.");
};

// Function to set up SpecSpy by fetching the Swagger spec
export const SpecSpySetup = async (
  specAddress: string
): Promise<Record<string, any>> => {
  try {
    return await getSpecsheet(specAddress);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching Swagger spec.");
  }
};
