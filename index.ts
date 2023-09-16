import { load } from "js-yaml";
import http, { IncomingMessage } from "http";
import https from "https";

type Protocol = typeof http | typeof https;

const fetchData = (
  url: string,
  protocol: Protocol
): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    protocol
      .get(url, (response: IncomingMessage) => {
        let data = "";

        response.on("data", (chunk: string) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const result = url.endsWith(".yaml")
              ? load(data)
              : JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(new Error("Failed to parse the data."));
          }
        });
      })
      .on("error", reject);
  });
};

const getSpecsheet = async (address: string): Promise<Record<string, any>> => {
  if (address.startsWith("https://")) {
    return fetchData(address, https);
  } else if (address.startsWith("http://")) {
    return fetchData(address, http);
  } else {
    throw new Error("Unsupported protocol in the Swagger address.");
  }
};

export const APISweeperSetup = async (
  specAddress: string
): Promise<Record<string, any>> => {
  try {
    return await getSpecsheet(specAddress);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching Swagger spec.");
  }
};

expect.extend({
  toBeApiIn(received: Function, spec: Record<string, any>) {
    const paths = spec.paths;
    const [method, pathSegment] = received.name
      .split(/(?=[A-Z])/)
      .map((s) => s.toLowerCase());
    const path = `/${pathSegment}`;

    const isQueryAPI = Boolean(
      method === "query" &&
        paths[`/${received.name}`] &&
        paths[`/${received.name}`].post
    );
    const isOtherAPI = Boolean(paths[path] && paths[path][method]);

    const isAPI = isQueryAPI || isOtherAPI;

    return {
      message: () =>
        `expected ${received} ${isAPI ? "not " : ""}to be an API function`,
      pass: isAPI,
    };
  },
});

export {};
