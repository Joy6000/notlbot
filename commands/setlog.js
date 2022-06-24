module.exports = {
    name: 'setlog',
    aliases: ['logchannel', 'setlogs'],
    description: 'Set the log channel for this guild',
    category: 'Mod',
    reqPerms: ['MANAGE_SERVER'],
    async execute({ message, args }) {
        let guildData = require('../models/guildData')
        let mongo = require('../utils/mongo')
        if (message.member.roles.cache.some(role => role.name != "staff")) {
            message.channel.send("Sorry, you can't use this!")
            return
        }
        if (args[0]) {
            let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.guild.channels.cache.get(args[0])
            if (!channel) return message.reply('I could not find that channel in this guild.')

            await mongo().then(async () => {
                await guildData.findOneAndUpdate({
                    _id: message.guild.id
                },
                {
                    $set: {
                        'logChannel': JSON.parse(JSON.stringify(channel))
                    }
                },
                {
                    upsert: true
                })
            })

            message.channel.send(`Set the log channel to ${channel}`)
        }
    }
}