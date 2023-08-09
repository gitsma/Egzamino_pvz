const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
))

module.exports = Category;