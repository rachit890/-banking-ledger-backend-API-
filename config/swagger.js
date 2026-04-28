const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Banking API",
      version: "1.0.0",
      description: "API documentation for Banking Backend",
    },
    servers: [
      {
        url: "https://banking-backend-n1y8.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // where your routes are
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;