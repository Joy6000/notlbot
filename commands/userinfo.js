const moment = require('moment')
module.exports = {
    name: 'userinfo',
    aliases: ['whois', 'ui'],
    category: 'Misc',
    usage: '<user>',
    description: 'Get user info',
    async execute({ message, args }) {
        const member = message.mentions.members.first() || message.guild.member(args[0])  || await getUser() || client.users.fetch(args[0])
        date = new Date(), joinedDate = new Date(member.joinedTimestamp), createdDate = new Date(member.user.createdTimestamp);

    const yearsOld = date.getFullYear() - createdDate.getFullYear(), daysOld = Math.round((date.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
    const joinedSince = Math.round((date.getTime() - joinedDate.getTime()) / (1000 * 3600 * 24)) || 'User has not joined this server.'

    let permissionRole = '';

    const getPermission = () => {

        if (message.guild.ownerID === member.user.id)
            return permissionRole = 'Server Owner';

            if (member.hasPermission("ADMINISTRATOR"))
                return  permissionRole = "Administrator";

            if (member.hasPermission("BAN_MEMBERS") || member.hasPermission("KICK_MEMBERS"))
                return permissionRole = "Moderator";

             if (member.hasPermission('MANAGE_MESSAGES'))
                return permissionRole = "Helper";

            else
                return permissionRole =  "Member";
    }

    const status = () => {
        switch(member.user.presence.status) {
            case "online":
                return "🟢 Online";
            case "idle":
                return "🌒 Idle";
            case "dnd":
                return "🔴 Do Not Disturb";
            case "offline":
                return "👤 Offline";
            default:
                return "No Status Found.";
        }
    }

   

    
    // you will be able to just type a members name like: ;whois LioFires and it will display my information. This is not casesentive 
    function getUser() {

        const searchMember = args.join(" ");
        const getMember = message.guild.members.cache;

        const cachedMember = getMember.find(member => member.displayName.toLowerCase() === searchMember.toLowerCase()) || getMember.find(member => member.user.username.toLowerCase() === searchMember.toLowerCase());

        return (cachedMember !== undefined) ? cachedMember : message.member;
    }
    function isBot() {
        if (member.user.bot) {
            return 'This user is a bot.'
        } else return 'This user is not a bot.'
    }




    const memberInfo = [
        `Display Name: '${member.displayName}'`,
        ``,
        `Server Role: '${getPermission() || 'This user is not in this server'}'`,
        ``,
        `User Joined This Server ${joinedSince} Days Ago.`,
        ``,
        `User Joined This Server on ${moment(member.joinedTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a') || 'User is not in this server'}`,
        ``,
        `Account is ${yearsOld} Years Old.`,
        ``,
        `Account Was Created on ${moment(member.user.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
        ``,
        `Bot?\n${isBot()}`,
        ``,
        `Highest Role: '${member.roles.highest.name || 'User is not in this server.'}'`,
        ``,
        `Highest Role Hex Code: '${member.displayHexColor || 'User is not in this server'}'`,
        ``,
        `Current Status: '${status()}'`,
    ];

    const Discord = require('discord.js')
   await message.channel.send(
       new Discord.MessageEmbed()
      

            .setColor(member.displayHexColor)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setDescription(`\`\`\`js\n${memberInfo.join('\n')}\`\`\``)
            .setAuthor(`${member.user.tag}(s) Info`)
            .setFooter(`Username: ${member.user.username}\nDiscriminator: ${member.user.discriminator}\nID: ${member.user.id}`));
    }
}