# Smart Expense Tracker API

Smart Expense Tracker API is a Node.js and Express.js REST API for managing personal expenses without a database. It supports creating, listing, filtering, summarizing, and deleting expenses while persisting data in a local JSON file.

## Overview

This project follows a layered structure:

- Routes define the HTTP endpoints.
- Controllers handle request and response flow.
- Services contain validation and business logic.
- File utilities manage JSON persistence.

The API is designed for local development and assessment workflows, with unit and integration coverage provided through Jest and Supertest.

## Features

- Add a new expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate total expenses by category
- Delete an expense
- Input validation
- Error handling
- JSON file persistence
- Unit and integration tests

## Tech Stack

- Node.js
- Express.js
- UUID
- Jest
- Supertest

## Project Structure

```text
Diligent_assessment/
├─ app.js
├─ data/
│  └─ expenses.json
├─ package.json
├─ README.md
├─ AI_NOTES.md
├─ src/
│  ├─ app.js
│  ├─ controllers/
│  │  └─ expense.controller.js
│  ├─ middleware/
│  │  └─ errorHandler.js
│  ├─ routes/
│  │  └─ expenses.routes.js
│  ├─ services/
│  │  └─ expense.service.js
│  └─ utils/
│     └─ fileHandler.js
└─ tests/
	 └─ expense.test.js
```

## Installation

```bash
npm install
```

## Run the Server

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

## Run Tests

```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /expenses | Add a new expense |
| GET | /expenses | Get all expenses |
| GET | /expenses?category=Food | Filter expenses by category |
| GET | /expenses/summary | Get the total of all expenses |
| GET | /expenses/summary?category=Food | Get the total for a single category |
| DELETE | /expenses/:id | Delete an expense by ID |

## Validation Rules

The API validates request payloads before creating an expense.

- Title is required
- Amount is required, numeric, and greater than 0
- Category is required
- Date is required and must be valid

Invalid input returns HTTP 400 with a validation error response.

## Error Handling

- Unknown expense IDs return HTTP 404
- Invalid routes return HTTP 404
- Unexpected server failures are handled by centralized error middleware

## Persistence

Expense records are stored locally in:

```text
data/expenses.json
```

This file is updated whenever an expense is created or deleted. Because the storage is file-based, data remains available after the server restarts.

## Sample Request

```json
{
	"title": "PANT",
	"amount": 2000,
	"category": "DRESS",
	"date": "2026-08-01"
}
```

## Sample Response

```json
{
	"id": "f43b8c1d-fe75-476b-a7f5-21ddfce8e72b",
	"title": "PANT",
	"amount": 2000,
	"category": "DRESS",
	"date": "2026-08-01"
}
```

## Error Responses

### 400 Bad Request

Returned when validation fails.

```json
{
	"errors": ["Category is required."]
}
```

### 404 Not Found

Returned when an expense does not exist or the route is invalid.

```json
{
	"message": "Expense not found"
}
```

### 500 Internal Server Error

Returned when an unexpected failure occurs and is caught by the global error handler.

## Testing

The project includes automated Jest and Supertest coverage for:

- Health check
- Create expense flow
- Validation failures
- Filtering by category
- Summary calculations
- Delete expense flow
- Invalid route handling

The attached Postman screenshots in the submission demonstrate these behaviors against the running API.

## API Screenshots

### Create Expense

![Delete expense response](screenshots/Screenshot%202026-07-31%20234101.png)

### Summary Endpoint

![Category filter response](screenshots/Screenshot%202026-07-31%20234151.png)


### Category Filter
![Summary response](screenshots/Screenshot%202026-07-31%20234237.png)


### Delete Expense


![Create expense response](screenshots/Screenshot%202026-07-31%20234302.png)

## Future Improvements

- Add Swagger or OpenAPI documentation
- Add Docker support
- Add search and pagination
- Add monthly and yearly summaries
- Add more robust schema validation

## Notes

- Start the API with `npm start`.
- Use `npm run dev` for local development.
- Run `npm test` before submitting changes.
