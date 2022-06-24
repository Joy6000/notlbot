module.exports = {
    name: 'eval',
    aliases: ['evaluate'],
    ownerOnly: true,
    reqArgs: 1,
    usage: '<code>',
    category: 'Owner Only',
    async execute({ message, args, client, handler }) {
        if (message.author.id !== '527599831091380234') return
        let run = args.join(' ')
        let { MessageEmbed } = require('discord.js')
        try {
        const embed = new MessageEmbed()
        .addFields(
            {
                name: `To Evaluate:`,
                value: `\`\`\`js\n${run}\`\`\``
            },
            {
                name: 'Evaluated:',
                value: `\`\`\`js\n${await eval((run))}\`\`\``
            }
        )
        message.reply(embed)
        } catch(err) {
            console.log(err)
            const embed = new MessageEmbed()
            .addFields(
                {
                    name: `To Evaluate:`,
                    value: `\`\`\`js\n${run}\`\`\``
                },
                {
                    name: 'Error:',
                    value: `\`\`\`js\n${err}\`\`\``
                }
            )
            message.channel.send(embed)
        }
    }
}