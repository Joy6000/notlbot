module.exports = {
    name: 'staff',
    aliases: ['mods', 'civil protection'],
    category: 'Misc',
    description: 'Lists all mods',
    async execute({ message, args, client }) {
        // fetch staff
        let staff = await message.guild.members.fetch().then(members => members.filter(member => (member.permissions.has('MANAGE_MESSAGES') && !member.user.bot) || (member.permissions.has('ADMINISTRATOR') && !member.user.bot)))
        message.channel.send(`Current Members of ${message.guild.name} Staff Team include:\n**${staff.map(member => member.user.tag).join(', ')}**`)
    }
}