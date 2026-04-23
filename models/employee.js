const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    // personal info
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // job details
    department: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },

    // Number type so we can format it with toLocaleString in the view
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt to every document
);

module.exports = mongoose.model("Employee", employeeSchema);
