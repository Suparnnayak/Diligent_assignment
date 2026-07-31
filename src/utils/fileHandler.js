const fs = require("fs");
const path = require("path");

const DATA_DIR = path.resolve(__dirname, "..", "..", "data");
const DATA_FILE = path.join(DATA_DIR, "expenses.json");

/**
 * File Handler
 * Responsible ONLY for:
 *   - Reading JSON
 *   - Writing JSON
 * No business logic, no validation.
 */

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

function readExpenses() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  if (!raw || raw.trim() === "") return [];
  return JSON.parse(raw);
}

function writeExpenses(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  readExpenses,
  writeExpenses,
};
