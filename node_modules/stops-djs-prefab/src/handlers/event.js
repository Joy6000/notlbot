const fs = require('fs')
const path = require('path')

function loadEVNTS(dir, handler, client) {
    fs.readdir(`${require.main.path}\\${dir}`, (err, files) => {
        let totalEvents = 0;
        for (const event in files) totalEvents++;
        console.log(`Loaded a total of ${totalEvents} events.`)
        for (const event of files) {
            delete require.cache[event]
            const File = require(`${require.main.path}\\${dir}\\${event}`)
            const { name } = path.parse(`${require.main.path}\\${dir}\\${event}`)
            isValid(name)
            handler.events.set(name, null)
            client.on(name, File.bind(null, client, handler))

            if (handler.showLoadedEVNS = true) {
                console.log(`Loaded event: "${event}"`)
            }
        }
    })
}
function isValid(event) {
    const validEvents = [
		'channelCreate',
		'channelDelete',
		'channelPinsUpdate',
		'channelUpdate',
		'debug',
		'emojiCreate',
		'emojiDelete',
		'emojiUpdate',
		'error',
		'guildBanAdd',
		'guildBanRemove',
		'guildCreate',
		'guildDelete',
		'guildIntegrationsUpdate',
		'guildMemberAdd',
		'guildMemberAvailable',
		'guildMemberRemove',
		'guildMembersChunk',
		'guildMemberSpeaking',
		'guildMemberUpdate',
		'guildUnavailable',
		'guildUpdate',
		'invalidated',
		'inviteCreate',
		'inviteDelete',
		'message',
		'messageDelete',
		'messageDeleteBulk',
		'messageReactionAdd',
		'messageReactionRemove',
		'messageReactionRemoveAll',
		'messageReactionRemoveEmoji',
		'messageUpdate',
		'presenceUpdate',
		'rateLimit',
		'ready',
		'roleCreate',
		'roleDelete',
		'roleUpdate',
		'shardDisconnect',
		'shardError',
		'shardReady',
		'shardReconnecting',
		'shardResume',
		'typingStart',
		'userUpdate',
		'voiceStateUpdate',
		'warn',
		'webhookUpdate',
	]
    if (!validEvents.includes(event)) throw new ReferenceError(`Stop Prefab => event "${event}" is not valid.`);
    return true
}
module.exports = loadEVNTS