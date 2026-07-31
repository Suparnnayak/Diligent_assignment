const express = require("express");
const expenseController = require("../controllers/expenseController");

/**
 * Routes Layer
 * Only defines endpoints. Nothing else.
 */

const router = express.Router();

router.post("/expenses", expenseController.addExpense);
router.get("/expenses/summary", expenseController.getSummary);
router.get("/expenses", expenseController.getExpenses);
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
