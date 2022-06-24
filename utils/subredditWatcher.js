const snekfetch = require('snekfetch')
module.exports = {
    async execute(ID, URL, CHANNEL) {
        const results = require('../models/guildData').findById(ID)
        // if (!results?.subreddit) return
        // if (!results?.subredditChannel) return
        let subResults = await snekfetch.get('http://www.reddit.com/r/HalfLife/new.json?sort=new') 
        setInterval(() => {
        let num = Math.floor(Math.random() * subResults.body.data.children.length)
        CHANNEL.send('https://reddit.com' + subResults.body.data.children[num].data.permalink)
        }, 5000)
    }
}