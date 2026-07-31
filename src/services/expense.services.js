const { v4: uuidv4 } = require("uuid");
const fileHandler = require("../utils/fileHandler");

/**
 * Service Layer
 * Responsible for:
 *   - add expense
 *   - delete expense
 *   - calculate totals
 *   - filter
 *   - reading data
 *   - writing data
 * Almost the entire business logic lives here.
 */

// ---------- Validation ----------

function isValidDate(dateString) {
  if (typeof dateString !== "string") return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function validateExpenseInput({ title, amount, category, date }) {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("Title is required.");
  }

  if (amount === undefined || amount === null || amount === "") {
    errors.push("Amount is required.");
  } else if (typeof amount !== "number" || isNaN(amount)) {
    errors.push("Amount must be a number.");
  } else if (amount <= 0) {
    errors.push("Amount must be greater than 0.");
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    errors.push("Category is required.");
  }

  if (!date || typeof date !== "string" || date.trim() === "") {
    errors.push("Date is required.");
  } else if (!isValidDate(date)) {
    errors.push("Date must be a valid date.");
  }

  return errors;
}

// ---------- Core Operations ----------

function getAllExpenses() {
  return fileHandler.readExpenses();
}

function getExpensesByCategory(category) {
  const expenses = fileHandler.readExpenses();
  return expenses.filter(
    (expense) => expense.category.toLowerCase() === category.toLowerCase()
  );
}

function addExpense(input) {
  const errors = validateExpenseInput(input);
  if (errors.length > 0) {
    return { error: errors };
  }

  const expenses = fileHandler.readExpenses();

  const newExpense = {
    id: uuidv4(),
    title: input.title,
    amount: input.amount,
    category: input.category,
    date: input.date,
  };

  expenses.push(newExpense);
  fileHandler.writeExpenses(expenses);

  return { data: newExpense };
}

function deleteExpense(id) {
  const expenses = fileHandler.readExpenses();
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return { error: "not_found" };
  }

  expenses.splice(index, 1);
  fileHandler.writeExpenses(expenses);

  return { success: true };
}

function calculateTotal() {
  const expenses = fileHandler.readExpenses();
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

function calculateCategoryTotal(category) {
  const expenses = getExpensesByCategory(category);
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

module.exports = {
  validateExpenseInput,
  getAllExpenses,
  getExpensesByCategory,
  addExpense,
  deleteExpense,
  calculateTotal,
  calculateCategoryTotal,
};
