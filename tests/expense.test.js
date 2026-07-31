const request = require("supertest");
const path = require("path");
const fs = require("fs");

const app = require("../app");

const DATA_FILE = path.join(__dirname, "..", "data", "expenses.json");

function resetData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
}

beforeEach(() => {
  resetData();
});

afterAll(() => {
  resetData();
});

describe("GET /", () => {
  it("returns the health check message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Expense Tracker API Running" });
  });
});

describe("POST /expenses", () => {
  it("creates a new expense and returns 201", async () => {
    const res = await request(app).post("/expenses").send({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });
    expect(res.body.id).toBeDefined();
  });

  it("rejects an invalid payload with 400 (missing title, negative amount)", async () => {
    const res = await request(app).post("/expenses").send({
      title: "",
      amount: -5,
      category: "Food",
      date: "2026-07-31",
    });

    expect(res.statusCode).toBe(400);
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it("rejects a missing category with 400", async () => {
    const res = await request(app).post("/expenses").send({
      title: "Lunch",
      amount: 150,
      date: "2026-07-31",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Category is required.");
  });

  it("rejects an invalid date with 400", async () => {
    const res = await request(app).post("/expenses").send({
      title: "Movie",
      amount: 300,
      category: "Entertainment",
      date: "not-a-date",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Date must be a valid date.");
  });

  it("rejects a non-numeric amount with 400", async () => {
    const res = await request(app).post("/expenses").send({
      title: "Snacks",
      amount: "abc",
      category: "Food",
      date: "2026-07-31",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain("Amount must be a number.");
  });
});

describe("GET /expenses", () => {
  it("returns an empty list when no expenses exist", async () => {
    const res = await request(app).get("/expenses");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns all expenses after adding some", async () => {
    await request(app).post("/expenses").send({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });
    await request(app).post("/expenses").send({
      title: "Bus Ticket",
      amount: 50,
      category: "Travel",
      date: "2026-07-30",
    });

    const res = await request(app).get("/expenses");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe("GET /expenses?category=", () => {
  it("returns only expenses matching the category", async () => {
    await request(app).post("/expenses").send({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });
    await request(app).post("/expenses").send({
      title: "Bus Ticket",
      amount: 50,
      category: "Travel",
      date: "2026-07-30",
    });

    const res = await request(app).get("/expenses?category=Food");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].category).toBe("Food");
  });

  it("returns an empty array for a category with no matches", async () => {
    const res = await request(app).get("/expenses?category=Rent");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("GET /expenses/summary", () => {
  it("returns the overall total of all expenses", async () => {
    await request(app).post("/expenses").send({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });
    await request(app).post("/expenses").send({
      title: "Bus Ticket",
      amount: 50,
      category: "Travel",
      date: "2026-07-30",
    });

    const res = await request(app).get("/expenses/summary");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ total: 170 });
  });

  it("returns total 0 when there are no expenses", async () => {
    const res = await request(app).get("/expenses/summary");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ total: 0 });
  });
});

describe("GET /expenses/summary?category=", () => {
  it("returns the total for a single category", async () => {
    await request(app).post("/expenses").send({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });
    await request(app).post("/expenses").send({
      title: "Groceries",
      amount: 860,
      category: "Food",
      date: "2026-07-29",
    });
    await request(app).post("/expenses").send({
      title: "Bus Ticket",
      amount: 50,
      category: "Travel",
      date: "2026-07-30",
    });

    const res = await request(app).get("/expenses/summary?category=Food");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ category: "Food", total: 980 });
  });
});

describe("Invalid routes", () => {
  it("returns 404 for an unknown route", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Route not found" });
  });
});

describe("DELETE /expenses/:id", () => {
  it("deletes an existing expense and returns 200", async () => {
    const createRes = await request(app).post("/expenses").send({
      title: "Coffee",
      amount: 120,
      category: "Food",
      date: "2026-07-31",
    });
    const { id } = createRes.body;

    const deleteRes = await request(app).delete(`/expenses/${id}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body).toEqual({ message: "Expense deleted" });

    const listRes = await request(app).get("/expenses");
    expect(listRes.body.find((e) => e.id === id)).toBeUndefined();
  });

  it("returns 404 when deleting a non-existent expense", async () => {
    const res = await request(app).delete("/expenses/does-not-exist");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Expense not found" });
  });
});
