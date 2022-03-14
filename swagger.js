const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Example API",
    description: "Swagger autogen학습을 위한 예시문서입니다.",
    version: "1.0.0",
  },
  servers: [{ url: "localhost:3000" }],
  schemes: ["http"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "cookie",
      name: "auth",
      description: "유저 토큰을 넣어주세요",
    },
  },
  tags: [
    { name: "User", description: "User Endpoint" },
    { name: "Car", description: "Car Endpoint" },
  ],
  components: {
    schemas: {
      User: {
        id: 0,
        name: "Haha",
        height: 169,
      },
      Car: {
        id: 1,
        name: "benz",
        owner: { $ref: "#/components/schemas/User" },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFile = ["./app.js"];

swaggerAutogen(outputFile, endpointsFile, doc).then(() => require("./app.js"));
