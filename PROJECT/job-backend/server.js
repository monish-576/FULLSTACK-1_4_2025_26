const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//  MongoDB Connection
mongoose.connect("mongodb://monish_576:Monish%404135@ac-1evi8nc-shard-00-00.iagpqkk.mongodb.net:27017,ac-1evi8nc-shard-00-01.iagpqkk.mongodb.net:27017,ac-1evi8nc-shard-00-02.iagpqkk.mongodb.net:27017/jobportal?ssl=true&replicaSet=atlas-teqfjs-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// MODELS
const Application = require("./models/Application");

//  TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

//  ROUTES
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api", authRoutes);
app.use("/api", jobRoutes);

//  NEW: GET APPLIED JOBS BY EMAIL
app.get("/api/applications/:email", async (req, res) => {
    try {
        const data = await Application.find({ email: req.params.email });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});