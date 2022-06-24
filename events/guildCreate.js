module.exports = (client, handler, guild) => {
    console.log(`Joined guild ${guild.name} with ID ${guild.id}`)
    let channel = guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'lounge')
    if (!channel) return console.log('Failed to send welcome message.')
    try {
    channel.send('Hello, my prefix is `c!`. You can get to the help menu by using `c!help`, if you want to get info for a certain command, do `c!help [command]`')
    } catch(err) {
        console.log('Failed to send welcome message with error: ', err)
    }
    //.send('Hello, my prefix is `c!`. You can get to the help menu by using `c!help`, if you want to get info for a certain command, do `c!help [command]`')
}