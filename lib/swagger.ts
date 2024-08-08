import { createSwaggerSpec } from "next-swagger-doc";

let apiUrl: string;

if (typeof window !== "undefined" && window.location) {
  // Browser environment
  apiUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
} else {
  // Node.js environment
  const os = require("os");
  const hostname = os.hostname();
  apiUrl = `http://${hostname}:3000`;
}

export const getAPISpec = () => {
  const spec = createSwaggerSpec({
    title: "Movie API",
    version: "1.0.0",
    apiFolder: "app/api",
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    paths: {},
    components: {},
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Movie API",
        version: "1.0.0",
      },
    },
  });

  return spec;
};
