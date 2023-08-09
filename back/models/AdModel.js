const mongoose = require('mongoose');

const Ad = mongoose.model('Ad', new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title']
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price']
        },
        img: {
            type: String,
            required: [true, 'Please add a img']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        status: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
))

module.exports = Ad;