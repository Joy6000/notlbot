const Discord = require('discord.js')

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
})

class notlbot2 extends Discord.Client {
    constructor(options) {
        super(options)
    }
    /**
     * Starts This Client
     */
    start() {
        const bot = require('stops-djs-prefab')
        const disbut = require('discord-buttons')
        const reactionRoles = require('./reactionRoles')
        disbut(client)
        
        
        new bot(client, {
            commandsDir: 'commands',
            eventsDir: 'events'
        })
        .setPrefix('n!')
        .setOwners(['527599831091380234'])
        client.login(process.env.TOKEN)

        return this
    }
   
}

module.exports = notlbot2