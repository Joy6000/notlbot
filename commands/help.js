const help = require('../utils/HelpEmbeds')

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Shows this menu, or info about a specified command',
    category: 'Help',
    usage: '[command]',
    async execute({ message, args, client, handler, array }) {
        let full = []
        // Message didn't have any args; show full help menu
        if (!args[0]) {
            help.base(handler, message, true).then(async (array) => {
                let collector = await array[0].createReactionCollector(thing => !thing.me, { idle: 60000 })
    
                collector.on('collect', async (collected) => {
                    array[0].reactions.cache.get(collected.emoji.name).users.remove(message.author.id)
                    let valued = Object.values(array[1])
                    let found = valued.find(x => x === collected.emoji.name)
                    if (found === array[1]['Ad Management']) {
                        help.manager(handler, array[0], 'Ad Management')
                    } 
                    if (found === array[1]['Brain']) {
                        help.manager(handler, array[0], 'Brain')
                    }
                    if (found === array[1]['Fun']) {
                        help.manager(handler, array[0], 'Fun')
                    }
                    if (found === array[1]['Help']) {
                        help.manager(handler, array[0], 'Help')
                    }
                    if (found === array[1]['Misc']) {
                        help.manager(handler, array[0], 'Misc')
                    }
                    // if (found === array[1]['Subreddit Watcher']) {
                    //     help.manager(handler, array[0], 'Subreddit Watcher')
                    // }
                    if (found === array[1]['Mod']) {
                        help.manager(handler, array[0], 'Mod')
                    }   
                    if (found === array[1]['Go back to this page']) {
                        array[0].edit({embed: array[2]})
                    }
                })
            })
        } else {
            let command = handler.commands.get(args[0]) || handler.commands.find(cmd => cmd.aliases && cmd.aliases.length && cmd.aliases.includes(args[0]))
            // Command doesn't exist?
            if (!command) return message.reply('No such command exists.')
            // send command info
            message.channel.send(`**c!${command.name}**\n\n**Aliases:** ${!command.aliases ? '' : 'c!'}${command.aliases ? command.aliases.join(', c!') : 'No aliases'}\n**Usage:** ${command.usage ? command.usage : 'No usage set'}\n**Description:** ${command.description ? command.description : 'No description set'}`)
        }
    }
}