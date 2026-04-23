// load environment variables from .env (MONGO_URI, PORT)
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // needed so forms can send PUT and DELETE
const path = require("path");

const employeeRoutes = require("./routes/employees");

const app = express();

// tell express to use EJS and where to find the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// connect to MongoDB Atlas using the URI from .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/employees", employeeRoutes);

// root just redirects to the employees list
app.get("/", (req, res) => {
  res.redirect("/employees");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
