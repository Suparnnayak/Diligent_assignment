const app = require("./src/app");

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Expense Tracker API running on port ${PORT}`);
  });
}

module.exports = app;
