module.exports = {
    name: 'mute',
    category: 'Mod',
    description: 'Mutes a Citizen',
    aliases: ['neutralize'],
    async execute({ message, args, client }) {
        if (message.member.roles.cache.some(role => role.name != "staff")) {
            message.channel.send("Sorry, you can't use this!")
            return
        }
        let target = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0])
        let guildData = require('../models/guildData')
        let results = await guildData.findById(message.guild.id)
        let mongo = require('../utils/mongo')

        if (!results || !results.muteRole) {
            message.channel.send('No active punishment role. Send ONLY the ID or @ of your muterole. Type cancel to cancel the command.')

            let collector = message.channel.createMessageCollector(msg => msg.author.id === message.author.id, { max: 1 })

            collector.on('collect', async (collected) => {
                if (collected.content === 'cancel') {
                    return message.reply('Command cancelled.')
                }

                let role = collected.mentions.roles.first() ? collected.mentions.roles.first() : message.guild.roles.cache.get(collected.content)

                if (!role) return message.reply('No such role exists.')

                try {
                    await mongo().then(async () => {
                        await guildData.findOneAndUpdate({
                            _id: message.guild.id,
                        }, 
                        {
                            $set: {
                                'muteRole': JSON.parse(JSON.stringify(role))
                            }
                        }, {
                            upsert: true
                        })
                    })
                } catch (err) {
                    message.channel.send(
                        'No such role exists.'
                    )
                }
            })
        } else {
            if (!target) return message.channel.send('Couldn\'t find that user.')
            let role = results.muteRole

            target.roles.add(role.id)
            message.channel.send(`${target} Has been muted.`)
        }
    }
}