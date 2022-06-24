const Discord = require('discord.js')

module.exports = {
    name: 'google',
    category: 'Fun',
    description: 'Searches google\nStatus: ⚠️ This command is still under development. Expect to see changes soon. For now, the command is practically useless, it only provides the link of the search you want to make. ',
    usage: '<Search>',
    reqArgs: 1,
    async execute({ message, args }) {
        let query = 'https://www.google.com/search?q=' + encodeURIComponent(args.join(' '))
        let embed = new Discord.MessageEmbed()
        .setTitle(args.join(' '))
        .setURL(query)
        message.channel.send(embed)
    }
}