# 🏦 Banking Backend API

A full-featured backend system for a banking application built using Node.js, Express, and MongoDB.
It supports authentication, account management, money transfer, transaction tracking, and a ledger system with API documentation using Swagger.

---

## 🚀 Live API

🔗 https://banking-backend-n1y8.onrender.com
📘 Swagger Docs: https://banking-backend-n1y8.onrender.com/api-docs

⚠️ Note: This project is deployed on Render (free tier).
The server may take **30–50 seconds to respond** after inactivity due to cold start.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT Authentication
* Swagger (OpenAPI)
* Render (Deployment)

---

## 📌 Features

### 🔐 Authentication

* User Registration
* User Login (JWT-based)

### 👤 Account

* Get current user account
* Check account balance

### 💸 Transactions

* Transfer money between accounts
* Fetch transaction history (with pagination)
* Get transaction by ID

### 📒 Ledger

* View account statement

### 📊 Pagination

* Implemented on transactions API
* Supports `page` and `limit`

### 📘 API Documentation

* Swagger UI integrated
* Available at `/api-docs`

---

## 📂 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

---

### 👤 Account

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | /api/account/me       | Get account details |
| GET    | /api/account/balance  | Get balance         |
| POST   | /api/account/transfer | Transfer money      |

---

### 💸 Transactions

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | /api/transactions     | Get paginated transactions |
| GET    | /api/transactions/:id | Get transaction by ID      |

Query Params:

```
?page=1&limit=10
```

---

### 📒 Ledger

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | /api/ledger | Get account statement |

---

## 🔐 Authentication

All protected routes require JWT token:

```
Authorization: Bearer <your_token>
```

---

## ⚙️ Installation (Local Setup)

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

### Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Run server:

```bash
npm start
```

---

## 📊 Pagination Example

```
GET /api/transactions?page=1&limit=5
```

Response:

```json
{
  "page": 1,
  "limit": 5,
  "total": 25,
  "totalPages": 5,
  "transactions": []
}
```

---

## ⚠️ Known Limitations

* Cold start delay (30–50 seconds) due to free hosting
* Backend-only project (no frontend UI)

---

## 🙌 Author

**Rachit Kumar**
