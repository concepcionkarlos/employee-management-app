const mongoose = require("mongoose");

// define the shape of an employee document in MongoDB
const employeeSchema = new mongoose.Schema(
  {
    // name fields - trim removes accidental whitespace
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

    // contact
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // job info
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

    // stored as a number so we can format it later (e.g. toLocaleString)
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // mongoose adds createdAt and updatedAt automatically
);

// export the model so routes can use it
module.exports = mongoose.model("Employee", employeeSchema);
