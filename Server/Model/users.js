const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cart: [{
        type: Object,
        required: true,
    }],
    address: [{
        type: Object,
        required: true,
    }]
}, {
    timestamps: true
});

const User = mongoose.model("User",userSchema);

module.exports = User