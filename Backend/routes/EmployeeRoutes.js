const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

console.log('entered router')
// Create Employee
router.post("/employee", async (req, res) => {
    const { EmployeeName, EmployeeID, EmployeeEmail, EmployeePhone } = req.body;

    if (!EmployeeName || !EmployeeID || !EmployeeEmail || !EmployeePhone) {
        return res.status(400).json({ message: "Missing Form Data" });
    }

    try {
        const existingEmployee = await Employee.findOne({ Email: EmployeeEmail });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newEmployee = new Employee({
            Employeename: EmployeeName,
            EmployeeID,
            Email: EmployeeEmail,
            Phone: EmployeePhone
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee Saved Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get All Employees
router.get("/details", async (req, res) => {
    console.log('entered')
    const data = await Employee.find();
    res.json(data);
});

// Get Employee by ID
router.get("/details/:id", async (req, res) => {
    const data = await Employee.findById(req.params.id);
    res.json(data);
});

// Delete Employee
router.delete("/deleteemployee/:id", async (req, res) => {
    const result = await Employee.findByIdAndDelete(req.params.id);
    res.json({ result });
});

// Update Employee
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { Employeename, EmployeeID, Email, Phone } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { Employeename, EmployeeID, Email, Phone },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee Not Found" });
        }

        res.status(200).json(updatedEmployee);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
