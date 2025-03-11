const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    Employeename: {
        type: String,
        required: true
    },
    EmployeeID: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
