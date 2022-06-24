module.exports = {
    name: 'test-buttons',
    description: 'Buttons Testing',
    category: 'Misc',
    async execute({ message, args, client, handler }) {
        const { MessageActionRow, MessageButton } = require('discord-buttons')

        const button1 = new MessageButton() 
        .setStyle('red')
        .setLabel('Edit')
        .setID('edit')

        const button2 = new MessageButton() 
        .setStyle('red')
        .setLabel('Edit')
        .setID('edit2')

        const row = new MessageActionRow()
        .addComponents([button1, button2])

        let messageE = await message.channel.send('Demonstration', {
            component: row
        })

        client.on('clickButton', (button) => {
            if (button.id === 'edit') {
                messageE.edit('This message was edited by use of the first button.', {
                    component: row
                })
            } else {
                messageE.edit('This message was edited by use of the second button.', {
                    component: row
                })
            }
        })
    }
}