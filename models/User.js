const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    chatId: { type: String, unique: true, required: true }, // Telegram Chat ID
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);