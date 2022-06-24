module.exports = {
    name: 'poll',
    usage: '<Yes Or No Question>',
    category: 'Fun',
    reqArgs: 1,
    async execute({ message, args }) {
        console.log(args)
        poll = message.content.replace('c!poll ', '')
        sentMessage = await message.channel.send(`**${message.member.nickname}** Has started a poll:\n${poll}`)
        reactions = [
            '👍',
            '👎'
        ]
        reactions.forEach(v => sentMessage.react(v))

    }
    
}