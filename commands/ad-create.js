const { Guild } = require("discord.js")
const { Collection } = require("discord.js")

module.exports = {
    name: 'ad create',
    aliases: ['ad-create', 'createad', 'create ad', 'create-ad'],
    reqPerms: ['MANAGE_SERVER'],
    usage: '<role @ or ID> <status>',
    category: 'Ad Management',
    reqArgs: 2,
    async execute({ message, args }) {
        if (message.member.roles.cache.some(role => role.name != "staff")) {
            message.channel.send("Sorry, you can't use this!")
            return
        }
        const guildData = require('../models/guildData')
        let results = await guildData.findById(message.guild.id)
        if (results?.ads) return message.reply('Max one ad per guild')
        args.shift()
        let newAd = {
            guildID: message.guild.id,
            status: args.join(' '),
            role: message.mentions.roles.first()
        }

        await guildData.findOneAndUpdate({
            _id: message.guild.id
        },
        {
            $set: {
                'ads': newAd
            },

        },
        {
            upsert: true
        })
        message.channel.send(`Ad criteria set to \`${newAd.status}\``)

    }
}