const express = require("express");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Expense Tracker API Running" });
});

// Feature routes
app.use("/", expenseRoutes);

// 404 handler - unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler - catches unexpected errors, returns 500
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Only start listening when run directly (node app.js).
// When required by tests (supertest), we just export the app.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Expense Tracker API running on port ${PORT}`);
  });
}

module.exports = app;
