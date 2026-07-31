const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "expenses.json");

/**
 * File Handler
 * Responsible ONLY for:
 *   - Reading JSON
 *   - Writing JSON
 * No business logic, no validation.
 */

function readJSON() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  if (!raw || raw.trim() === "") return [];
  return JSON.parse(raw);
}

function writeJSON(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  readJSON,
  writeJSON,
};
