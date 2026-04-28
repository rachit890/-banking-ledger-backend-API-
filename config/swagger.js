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
  
    components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
  
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;