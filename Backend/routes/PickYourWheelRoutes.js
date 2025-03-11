const express = require("express");
const CryptoJS = require("crypto-js")
const Pickyourwheel = require("../models/Pickyourwheel");
const moment = require('moment');

const router = express.Router();


router.post('/savepickerwheel', async (req, res) => {
    console.log('data', req)
    try {
        let { encrypted, data } = req.body;
        let jsonData;

        if (encrypted) {
            const bytes = CryptoJS.AES.decrypt(data, "secret-key");
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            jsonData = JSON.parse(decryptedText);
        } else {
            jsonData = data;
        }

        if (jsonData.mode === "SAVE") {
            const pickyWheelEntry = new Pickyourwheel(jsonData);
            await pickyWheelEntry.save();
            return res.status(201).json({ message: "Data saved successfully" });
        } else if (jsonData.mode === "UPDATE") {
            let userId = jsonData.USER_ID;

            const updatedEntry = await Pickyourwheel.findOneAndUpdate(
                { USER_ID: userId }, 
                { $set: jsonData }, 
                { new: true, upsert: false }
            );

            if (updatedEntry) {
                return  res.status(200).json({ message: "Data updated successfully", updatedEntry });
            } else {
                return  res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(400).json({ message: "Invalid mode" });
        }
        


        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;