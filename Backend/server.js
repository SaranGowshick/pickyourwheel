const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./models/Employee")
const employeeRoutes = require("./routes/EmployeeRoutes")
const pickWheelRoutes = require("./routes/PickYourWheelRoutes")

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/Employee")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.use("/", employeeRoutes);

app.use("/pickwheels",pickWheelRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

app.listen(3001, () => console.log("Server Listening at Port 3001"));
