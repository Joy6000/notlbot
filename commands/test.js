

module.exports = {
    name: 'ts',
    category: 'Owner Only',
    async execute({ message, args, client, handler }) {
        const disbut = require('discord-buttons')
        const { MessageButton, MessageActionRow } = disbut

        let button = new MessageButton()
            .setLabel("I like")
            .setEmoji("🌭")
            .setID("like_hotdog")
            .setStyle('red')
    
        let button2 = new MessageButton()
            .setLabel("I like")
            .setEmoji("🥞")
            .setStyle('red')
            .setID("like_pancake")

        let buttonRow = new MessageActionRow()
            .addComponent(button)
            .addComponent(button2)


        console.log(await message.channel.send("Hi", { component: buttonRow }))
        
    }
}