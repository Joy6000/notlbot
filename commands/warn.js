const { messages } = require('../utils/Constants')
let replaceBracket = require('../utils/StringManipulation')

module.exports = {
    name: 'warn',
    aliases: ['anti'],
    reqArgs: 1,
    usage: '<Citizen ID or @>',
    category: 'Mod',
    description: 'Warns a Citizen',
    async execute({ message, args, client }) {
        if (message.member.roles.cache.some(role => role.name != "staff")) {
            message.channel.send("Sorry, you can't use this!")
            return
        }
        try {
        const mongo = require('../utils/mongo')
        const cache = require('../models/cache')
        const target = message.mentions.users.first() ? message.mentions.users.first() : await client.users.fetch(args[0])
        if (!target) return message.reply(messages.WARN.NO_USER)
        args.shift()

        await mongo().then(async () => {
            await cache.findOneAndUpdate({
                _id: target.id
            },
            {
                $inc: {
                    'warns': 1
                }
            },
            {
                upsert: true
            })
        })


        let results = await cache.findById(target.id)
        let end 
        if (results.warns === 1) end = 'st warning.'
        if (results.warns === 2) end = 'nd warning.'
        if (results.warns === 3) {
            end = 'rd and final warning. You will be kicked in 5 seconds.'
            await cache.findOneAndDelete({
                _id: target.id
            })
            setTimeout(() => {
            message.channel.send('User kicked and warns reset.')
            }, 5000)
        }
        let success = messages.WARN.SUCCESS.replaceBracket('individual', target).replaceBracket('warns', results.warns).replaceBracket('end', end)
        message.channel.send(success)
        } catch (err) {
            message.reply('No such user exists.')
            console.log(err)
        }
    }
}