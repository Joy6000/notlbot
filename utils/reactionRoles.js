module.exports = function reactionRoles(ChannelId, client) {
   if (client.channels.fetch(ChannelId)) {
        const channel = client.channels.fetch(ChannelId)
        channel.send('test')
   } else return
}

