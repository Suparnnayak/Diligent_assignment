const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Expense Tracker API",
      version: "1.0.0",
      description: "REST API for managing personal expenses",
    },
    servers: [
      {
        url: "/",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);