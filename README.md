# 💳 Banking Backend API

This project is a backend system for a banking application, built to simulate real-world financial operations like money transfers, transaction tracking, and account management.

It focuses on **data consistency, security, and real-world backend practices** rather than just basic CRUD operations.

## 🚀 What this project does

This API allows users to:

* Register and log in securely using JWT authentication
* Maintain an account with a balance
* Transfer money to other users
* View transaction history
* Track all balance changes through a ledger system

##  Key Highlights

This project goes beyond basic backend development and includes:

* **Atomic Transactions**
  Ensures money transfers either fully succeed or fully fail (no partial updates)

* **Idempotency Handling**
  Prevents duplicate transactions if the same request is sent multiple times

* **Ledger System (Double-entry accounting)**
  Every transaction creates:

  * a debit entry (sender)
  * a credit entry (receiver)

* **Immutable Financial Records**
  Ledger entries cannot be modified once created

* **Proper Validation & Error Handling**
  Includes input validation and meaningful API responses

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (Authentication)**

---

## 📦 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

### 💸 Account

* `POST /api/account/transfer` → Transfer money
* `GET /api/account/balance` → Get current balance

### 📊 Transactions

* `GET /api/transactions` → Get transaction history
* `GET /api/transactions/:id` → Get specific transaction

---

## ⚙️ How to Run Locally

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

---

## 🧠 Project Design Thinking

This project was built with a focus on:

* Maintaining **data consistency during concurrent operations**
* Preventing **duplicate transactions using idempotency keys**
* Separating concerns across controllers and models
* Designing systems similar to **real banking backends**

---

## 📌 Future Improvements

* Pagination for transaction history
* Rate limiting for API protection
* Deployment and live API access

---

## 🙌 Final Note

This project represents a step beyond beginner backend development and focuses on solving real-world problems like **safe money transfer and transaction tracking**.

---
