const Discord = require('discord.js')
const mongoose = require('mongoose')

const guildData = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    muteRole: {
        type: Object,
        required: false
    },
    prefix: {
        type: String,
        required: false
    },
    logChannel: {
        type: Object,
        required: false
    },
    ads: {
        type: Object,
        required: false
    },
    subredditChannel: {
        type: Object,
        required: false
    },
    subreddit: {
        type: String,
        required: false
    },
    starboardRequiredCount: {
        type: Number,
        required: false,
    },
    starboardChannel : {
        type: Object,
        required: false
    }
})

module.exports = mongoose.model('guildData', guildData)