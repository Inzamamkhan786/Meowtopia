const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
firstName: {
type: String,
required: [true, "First name is required"],
trim: true,
minlength: [2, "First name must be at least 2 characters"]
},
lastName: {
type: String,
trim: true
},
email: {
type: String,
required: [true, "Email is required"],
unique: true,
lowercase: true,
trim: true
},
password: {
type: String,
required: [true, "Password is required"],
minlength: [8, "Password must be at least 8 characters"]
},
termsAccepted: {
type: Boolean,
default: false
}
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields

module.exports = mongoose.model("Person", personSchema);