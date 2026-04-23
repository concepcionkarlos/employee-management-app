const express = require("express");
const router = express.Router();

// bring in the Employee model to interact with MongoDB
const Employee = require("../models/employee");

// --- helper: validate form data before saving ---
// returns an array of error messages, empty if everything is ok
function validateEmployee(data) {
  const errs = [];

  if (!data.firstName?.trim()) errs.push("First name is required.");
  if (!data.lastName?.trim()) errs.push("Last name is required.");
  if (!data.email?.trim()) errs.push("Email is required.");
  if (!data.department?.trim()) errs.push("Department is required.");
  if (!data.position?.trim()) errs.push("Position is required.");

  // salary needs to exist and be a positive number
  if (!data.salary && data.salary !== 0) {
    errs.push("Salary is required.");
  } else if (isNaN(Number(data.salary)) || Number(data.salary) < 0) {
    errs.push("Salary must be a valid positive number.");
  }

  return errs;
}

// GET /employees - show all employees, newest first
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render("employees/index", { employees });
  } catch (err) {
    res.status(500).send("Error loading employees");
  }
});

// GET /employees/new - show the form to add a new employee
router.get("/new", (req, res) => {
  // pass empty errors and formData so the view doesn't crash on first load
  res.render("employees/new", { errors: [], formData: {} });
});

// POST /employees - save a new employee to the database
router.post("/", async (req, res) => {
  const errors = validateEmployee(req.body);

  // if there are errors, go back to the form and show them
  if (errors.length) {
    return res.status(422).render("employees/new", { errors, formData: req.body });
  }

  try {
    await Employee.create(req.body);
    res.redirect("/employees");
  } catch (err) {
    res.status(400).render("employees/new", {
      errors: ["Something went wrong. Please try again."],
      formData: req.body,
    });
  }
});

// GET /employees/:id/edit - show the edit form pre-filled with current data
router.get("/:id/edit", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render("employees/edit", { employee, errors: [] });
  } catch (err) {
    res.status(404).send("Employee not found");
  }
});

// PUT /employees/:id - update an existing employee
// (the form sends POST but method-override turns it into PUT)
router.put("/:id", async (req, res) => {
  const errors = validateEmployee(req.body);

  if (errors.length) {
    // reload the edit form with the errors and the submitted data
    try {
      const employee = await Employee.findById(req.params.id);
      Object.assign(employee, req.body); // keep the user's edits visible in the form
      return res.status(422).render("employees/edit", { employee, errors });
    } catch {
      return res.status(404).send("Employee not found");
    }
  }

  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect("/employees");
  } catch (err) {
    res.status(400).send("Error updating employee");
  }
});

// DELETE /employees/:id - remove an employee from the database
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/employees");
  } catch (err) {
    res.status(400).send("Error deleting employee");
  }
});

module.exports = router;
