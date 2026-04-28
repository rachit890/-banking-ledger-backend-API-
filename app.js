const express = require("express");
const app = express();

app.use(express.json());
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send("Banking API is running 🚀");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const accountRoutes = require("./routes/accountRoutes");
app.use("/api/account", accountRoutes);

const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

const ledgerRoutes = require("./routes/ledgerRoutes");
app.use("/api/ledger", ledgerRoutes);

module.exports = app;