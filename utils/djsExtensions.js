const { TextChannel, VoiceChannel, DMChannel, GuildChannel, Message, APIMessage, GuildChannelManager } = require('discord.js')
/**
 * 
 * @param {String} name 
 * @param {String} type 
 * @param {Object|String} parent 
 * @example
 * message.guild.channels.make('better-general', 'text', categoryID)
 */
GuildChannelManager.make = (name = 'test', type = 'text', parent = null) => {
    if (typeof name !== 'string') throw new TypeError('Param "name" must be a string.')
    if (typeof type !== 'text' || typeof type !== 'voice' || typeof type !== 'category') throw new TypeError('Invalid channel type "' + type + '"')
    let ch = GuildChannelManager.create(name, { type: type })
    if (!parent) return
    ch.setParent(parent)
}