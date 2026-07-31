const express = require("express");
const expenseController = require("../controllers/expense.controller");

/**
 * Routes Layer
 * Only defines endpoints. Nothing else.
 */

const router = express.Router();

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: PANT
 *               amount:
 *                 type: number
 *                 example: 2000
 *               category:
 *                 type: string
 *                 example: DRESS
 *               date:
 *                 type: string
 *                 example: "2026-08-01"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Validation failed
 */
router.post("/expenses", expenseController.addExpense);

/**
 * @swagger
 * /expenses/summary:
 *   get:
 *     summary: Get total expenses
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: Returns the overall total of all expenses
 */
router.get("/expenses/summary", expenseController.getSummary);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses or filter by category
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter expenses by category
 *     responses:
 *       200:
 *         description: Returns all matching expenses
 */
router.get("/expenses", expenseController.getExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
