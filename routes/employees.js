const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");

// validate form data before hitting the database
// returns an array of error strings - empty array means everything is fine
function validateEmployee(data) {
  const errs = [];

  if (!data.firstName?.trim()) errs.push("First name is required.");
  if (!data.lastName?.trim()) errs.push("Last name is required.");
  if (!data.email?.trim()) errs.push("Email is required.");
  if (!data.department?.trim()) errs.push("Department is required.");
  if (!data.position?.trim()) errs.push("Position is required.");

  // had to handle salary separately because 0 is falsy in JS
  if (!data.salary && data.salary !== 0) {
    errs.push("Salary is required.");
  } else if (isNaN(Number(data.salary)) || Number(data.salary) < 0) {
    errs.push("Salary must be a valid positive number.");
  }

  return errs;
}

// GET /employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render("employees/index", { employees });
  } catch (err) {
    res.status(500).send("Error loading employees");
  }
});

// GET /employees/new
router.get("/new", (req, res) => {
  // pass empty errors and formData so EJS doesn't crash on undefined
  res.render("employees/new", { errors: [], formData: {} });
});

// POST /employees - create a new employee
router.post("/", async (req, res) => {
  const errors = validateEmployee(req.body);

  if (errors.length) {
    // go back to the form and keep what the user typed (formData)
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

// GET /employees/:id/edit
router.get("/:id/edit", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render("employees/edit", { employee, errors: [] });
  } catch (err) {
    res.status(404).send("Employee not found");
  }
});

// PUT /employees/:id - update employee
// the form uses POST + ?_method=PUT because browsers don't support PUT in forms
router.put("/:id", async (req, res) => {
  const errors = validateEmployee(req.body);

  if (errors.length) {
    try {
      const employee = await Employee.findById(req.params.id);
      Object.assign(employee, req.body); // merge submitted data so the form stays filled
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

// DELETE /employees/:id
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/employees");
  } catch (err) {
    res.status(400).send("Error deleting employee");
  }
});

module.exports = router;
