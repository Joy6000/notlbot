module.exports = {
    name: 'purge',
    category: 'Mod',
    description: 'Purges a speficied amount of messages',
    usage: 'c!purge <number>',
    reqArgs: 1,
    reqPerms: ['MANAGE_MESSAGES'],
    async execute({ message, args }) {
        if (message.member.roles.cache.some(role => role.name != "staff")) {
            message.channel.send("Sorry, you can't use this!")
            return
        }
        let toPurge
        if (!args[0]) {
            toPurge = 5 + 1
        } if (args[0]) {
            toPurge = +args[0] + 1
        }
        
        message.channel.bulkDelete(toPurge)
        const msg = await message.channel.send(`**Deleted ${toPurge - 1} messages!**`, {timeout: 500})
        msg.delete({timeout: 5000})

    }
}