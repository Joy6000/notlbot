const mongoose = require('mongoose')

const cache = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    warns: {
        type: Number,
        required: false
    },
    kicks: {
        type: Number,
        required: false
    },
    bans: {
        type: Number,
        required: false
    },
    mutes: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('cache', cache)