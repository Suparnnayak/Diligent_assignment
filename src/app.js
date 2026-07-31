const express = require("express");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "Expense Tracker API Running" });
});


app.use("/", expenseRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Expense Tracker API running on port ${PORT}`);
});

module.exports = app;
