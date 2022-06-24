const { messages } = require('../utils/Constants')
const replaceBracket = require('../utils/StringManipulation')
//<:combine:830299462004899870>
//msg.createdTimestamp - message.createdTimestamp
//client.ws.ping

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Checks bots ping',
    category: 'Misc',
    async execute({ message, args, client }) {
        let msg = await message.channel.send(messages.PING.INITIAL)

        msg.edit(messages.PING.SUCCESS.replaceBracket('emoji', '<:Bot_Logo_MusaE:848733619174113301>').replaceBracket('ping', msg.createdTimestamp - message.createdTimestamp).replaceBracket('API', client.ws.ping))
    }
}