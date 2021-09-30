const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const FriendModel = mongoose.model("Friend", friendSchema);
module.exports = FriendModel;