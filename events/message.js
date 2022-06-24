const { Collection } = require('discord.js')
const cleverbot = require('cleverbot-free')
const objBase = require('../utils/classes')
let mentionRegex = /^<@!?830112521398386759> /
let arr = []

module.exports = async (client, handler, message) => {
    if (message.author.bot) return

    handler.spam = new Collection()
    const cache = require('../models/cache')
    let guildData = require('../models/guildData')
    const mongo = require('../utils/mongo');
    (async () => {
        if (message.channel.id === '837079824082272337') {
            if (message.author.id === '527599831091380234') return
            if (message.content.toLowerCase().includes('first')) message.delete()
        }
    })()
    
    // Clever Bot

    let userContexts = new Collection()

    try {
        if (message.content.match(mentionRegex)) {

            message.channel.startTyping()
            
            if (!userContexts.has(message.author.id)) userContexts.set(message.author.id, [])
            let contextArray = userContexts.get(message.author.id)
            if (contextArray.length > 50) contextArray = []

            let response = await cleverbot(message.content.replace(mentionRegex, ''), contextArray)

            contextArray.push(message.content.replace(mentionRegex, ''), response)
            userContexts.set(message.author.id, contextArray)

            message.channel.send(response)
            while(message.channel.typing) message.channel.stopTyping()

        }

    } catch (err) {
        message.channel.send('Couldn\'t get a response. Try again later.')
        console.log(err)
    }

    await mongo().then(async () => {
        await cache.findOneAndUpdate({
            _id: message.author.id,
        }, 
        {
            $set: {
                username: message.author.tag
            },
        },
        {
            upsert: true,
        })
    })
    let results = await guildData.findById(message.guild.id)
    let role = message.guild.roles.cache.get(results?.ads?.role)
    if (!role) return
    if (message.author.presence?.activities?.find(x => x?.name === 'Custom Status')?.state === results?.ads?.status) {
        message.member.roles.add(role)
    } else {
        if ((message.member.roles.cache.has(role.id) && message.author.presence?.activities?.find(x => x?.name === 'Custom Status')?.state === results?.ads.status) === false) {
            message.member.roles.remove(role)
        }
    }


}