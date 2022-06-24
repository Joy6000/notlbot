const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'invite',
    category: 'Misc',
    execute({message}) {
        message.channel.send(new MessageEmbed().setTitle('Invite').setURL('https://discord.com/api/oauth2/authorize?client_id=830112521398386759&permissions=8&scope=bot'))
    }
}