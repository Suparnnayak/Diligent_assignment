const express = require("express");
const expenseRoutes = require("./routes/expenses.routes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Expense Tracker API Running" });
});

// Feature routes
app.use("/", expenseRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler - unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler - catches unexpected errors, returns 500
app.use(errorHandler);

module.exports = app;
