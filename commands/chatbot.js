const snekfetch = require('snekfetch')

module.exports = {
    name: 'chatbot',
    aliases: ['ch'],
    category: 'Fun',
    async execute({message, args}) {
        let request
        try {
            request = await snekfetch.get(`https://api.monkedev.com/fun/chat?msg=${args.join(' ')}`)
        } catch(err) {
            message.channel.send('There was an error with the API. Make sure you actually typed something? If you did, try again later.')
            console.log(err)
        }
        message.channel.send(request.body.response)
    }
}