const { MessageEmbed } = require("discord.js")

module.exports.base = async (handler, message, send = true) => {
    let embed = new MessageEmbed()
    .setTitle('Command Categories:')
    .setDescription('React Below With Corresponding Emojis to View Category.')
    const categories = handler.categories.keyArray().filter(cat => cat !== 'Owner Only' && cat !== 'Subreddit Watcher')
    emojis = {
        'Ad Management': '🎟',
        'Brain': '🧠',
        'Misc': '🎈',
        'Fun': '🎡',
        'Help': '🚁',
        'Mod': '👮‍♂️',
        'Go back to this page': '🏠'
    }
    embed.addFields({
        name: 'Categories:',
        value: categories.map(x => `${emojis[x]} \`${x}\``).join(',\n') + '\n\n🏠 Go back to this page'
    })
    let msg = await message.channel.send(embed)
        for (const emoji of Object.values(emojis)) {
            if (send) 
            msg.react(emoji)
        }
        
        return [msg, emojis, embed] 
    
    

}

module.exports.manager = async (handler, message, category) => {
    let embed = new MessageEmbed()
    embed.setDescription('Usage: `c!help <command>`\nExample: `c!help ping` (optional)\n🏠 To go back to categories page')
    embed.addFields(
        {
            name: `Response Codes for ${category}:`,
            value: handler.commands.filter(x => x.category === category).map(x => `**${handler.prefix}${x.name}**\nUsage: ${x.usage ? x.usage : 'No usage'}\nAliases: ${x.aliases ? 'c!' + x.aliases.join(', c!') : 'No Aliases'}\nDescription: ${x.description ? x.description : 'No description.'}`).join('\n\n'),
        }
    )
    if (message) {
        message.edit({embed})
    }
}