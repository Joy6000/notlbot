module.exports = {
    name: 'manage-ads',
    aliases: ['ad-management', 'manage ads'],
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
        if (!results?.ads) return message.reply('No ads are set for this guild')
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