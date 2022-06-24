module.exports = {
    name: 'setmute',
    aliases: ['setmuterole', 'muterole'],
    category: 'Mod',
    description: 'Set the muterole for this guild',
    reqPerms: ['MANAGE_MEMBERS'],
    async execute({ message, args }) {
        const guildData = require('../models/guildData')
        if (message.member.roles.cache.some(role => role.name != "staff")) {
            message.channel.send("Sorry, you can't use this!")
            return
        }

        if (args[0]) {
            let role = message.mentions.roles.first() ? message.mentions.roles.first() : message.guild.roles.cache.get(args[0])
            await guildData.findOneAndUpdate({
                _id: message.guild.id
            }, {
                $set: {
                    'muteRole': JSON.parse(JSON.stringify(role))
                }
            },
            {
                upsert: true
            })
            message.channel.send(`Set mute role to ${role}`)
        } else {
            let results = await guildData.findById(message.guild.id)
            if (results) {
            message.channel.send(`Mute role is <@&${results.muteRole.id}>`)
            } else message.channel.send('There is no muterole for this guild')
        }
    }
}