// load environment variables from .env file (MONGO_URI, PORT)
require("dotenv").config();

// --- dependencies ---
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // lets forms send PUT and DELETE
const path = require("path");

// --- routes ---
const employeeRoutes = require("./routes/employees");

const app = express();

// --- view engine setup ---
// using EJS so we can render dynamic HTML with data from the database
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- middleware ---
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json());
app.use(methodOverride("_method")); // read _method from query string to override POST
app.use(express.static(path.join(__dirname, "public")));

// --- database connection ---
// MONGO_URI comes from .env so credentials are never in the code
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- mount routes ---
app.use("/employees", employeeRoutes);

// redirect root "/" to the employees list
app.get("/", (req, res) => {
  res.redirect("/employees");
});

// --- start server ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
