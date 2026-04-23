const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// APPLY JOB
router.post("/apply", async (req, res) => {
    try {
        const { fullname, mobile, company, post, email } = req.body;

        // prevent duplicate application
        const alreadyApplied = await Application.findOne({
            email,
            company,
            post
        });

        if (alreadyApplied) {
            return res.status(409).json({ message: "Already applied for this job ❌" });
        }

        const newApp = new Application({
            fullname,
            mobile,
            company,
            post,
            email
            // status defaults to "Pending"
        });

        await newApp.save();
        res.status(201).json({ message: "Application submitted ✅" });

    } catch (err) {
        res.status(500).json({ message: "Error submitting application ❌" });
    }
});


// GET USER APPLICATIONS
router.get("/applications/:email", async (req, res) => {
    try {
        const data = await Application.find({ email: req.params.email }).sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data ❌" });
    }
});


// GET ALL APPLICATIONS (FOR ADMIN)
router.get("/all-applications", async (req, res) => {
    try {
        const data = await Application.find().sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching all applications ❌" });
    }
});


// APPROVE APPLICATION
router.put("/approve/:id", async (req, res) => {
    try {
        const app = await Application.findById(req.params.id);
        if (!app) return res.status(404).json({ message: "Application not found ❌" });

        if (app.status === "Cancelled") {
            return res.status(400).json({ message: "Cannot approve a cancelled application ❌" });
        }

        await Application.findByIdAndUpdate(req.params.id, { status: "Approved" });
        res.json({ message: "Approved ✅" });
    } catch (err) {
        res.status(500).json({ message: "Error approving ❌" });
    }
});


// REJECT APPLICATION
router.put("/reject/:id", async (req, res) => {
    try {
        const app = await Application.findById(req.params.id);
        if (!app) return res.status(404).json({ message: "Application not found ❌" });

        if (app.status === "Cancelled") {
            return res.status(400).json({ message: "Cannot reject a cancelled application ❌" });
        }

        await Application.findByIdAndUpdate(req.params.id, { status: "Rejected" });
        res.json({ message: "Rejected ❌" });
    } catch (err) {
        res.status(500).json({ message: "Error rejecting ❌" });
    }
});


// CANCEL APPLICATION (by user)
router.put("/cancel/:id", async (req, res) => {
    try {
        const app = await Application.findById(req.params.id);
        if (!app) return res.status(404).json({ message: "Application not found ❌" });

        if (app.status !== "Pending") {
            return res.status(400).json({
                message: `Cannot cancel an application that is already ${app.status} ❌`
            });
        }

        await Application.findByIdAndUpdate(req.params.id, { status: "Cancelled" });
        res.json({ message: "Application cancelled ✅" });
    } catch (err) {
        res.status(500).json({ message: "Error cancelling application ❌" });
    }
});


module.exports = router;
