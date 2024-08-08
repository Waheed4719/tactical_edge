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
        url: apiUrl,
        description: "Development server",
      },
    ],
    paths: {
      "/api/movies": {
        get: {
          summary: "Get all movies",
          responses: {
            200: {
              description: "List of movies",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Movie",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new movie",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Movie",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Movie created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Movie",
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Movie: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            year: {
              type: "number",
            },
          },
          required: ["title", "year"],
        },
      },
    },
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
