const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    // Status lifecycle: Pending → Approved / Rejected  (user can Cancel while Pending)
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Cancelled"],
        default: "Pending"
    }
}, {
    timestamps: true   // adds createdAt & updatedAt automatically
});

module.exports = mongoose.model("Application", applicationSchema);
