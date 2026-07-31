const expenseService = require("../services/expenseService");

/**
 * Controller Layer
 * Responsible for:
 *   - reading request
 *   - extracting params
 *   - extracting body
 *   - calling service
 *   - returning response
 * No business logic.
 */

function addExpense(req, res) {
  const { title, amount, category, date } = req.body;

  const result = expenseService.addExpense({ title, amount, category, date });

  if (result.error) {
    return res.status(400).json({ errors: result.error });
  }

  return res.status(201).json(result.data);
}

function getExpenses(req, res) {
  const { category } = req.query;

  const expenses = category
    ? expenseService.filterByCategory(category)
    : expenseService.getAllExpenses();

  return res.status(200).json(expenses);
}

function getSummary(req, res) {
  const { category } = req.query;

  if (category) {
    const total = expenseService.getCategoryTotal(category);
    return res.status(200).json({ category, total });
  }

  const total = expenseService.getOverallTotal();
  return res.status(200).json({ total });
}

function deleteExpense(req, res) {
  const { id } = req.params;

  const result = expenseService.deleteExpense(id);

  if (result.error === "not_found") {
    return res.status(404).json({ message: "Expense not found" });
  }

  return res.status(200).json({ message: "Expense deleted" });
}

module.exports = {
  addExpense,
  getExpenses,
  getSummary,
  deleteExpense,
};
