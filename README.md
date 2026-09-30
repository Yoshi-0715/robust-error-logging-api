# Robust Error Handling & Logging – Product Catalog API

## Project Overview

This project demonstrates robust error handling and logging for a Product Catalog REST API built using Node.js, Express.js and TypeScript.

The project includes:

- Custom AppError class
- Centralized error handling
- Async error handling
- 404 handling for unknown routes
- Winston logging
- Morgan HTTP request logging
- Error logs and combined logs
- Consistent JSON error responses

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Winston
- Morgan
- Git
- GitHub
- Postman

---

## Project Structure

```text
robust-error-logging-api/
│
├── logs/
│   ├── error.log
│   └── combined.log
│
├── src/
│   ├── controllers/
│   ├── routes/
│   │   └── productRoutes.ts
│   │
│   ├── utils/
│   │   ├── AppError.ts
│   │   ├── asyncHandler.ts
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json