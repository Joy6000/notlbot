const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports = {
    name: 'serverinfo',
    aliases: ['si', 'server-info', 'guild-info'],
    category: 'Misc',
    description: 'Shows server info',
    execute({ message }) {
        function getVLevel (guild) {
            if (guild.verificationLevel === 'NONE') return 'No verification level required.';
            if (guild.verificationLevel === 'LOW') return 'Low restrictions; must have verified email associated with Discord account.';
            if (guild.verificationLevel === 'MEDIUM') return 'Medium restrictions; must have verified email associated with Discord account, and Discord account must be atleast 5 minutes old.';
            if (guild.verificationLevel === 'HIGH') return 'High restrictions; must have verified email associated with Discord account, be registered on Discord longer than 5 minutes, and be in the server for 10 minutes.';
            if (guild.verificationLevel === 'VERY_HIGH') return 'Very High restrictions; must have verified email associated with Discord account, registered on Discord longer than 5 minutes, be in server for 10 minutes, and have a verified phone number.';
        }
        function getEfilter (guild) {
            if (guild.explicitContentFilter === 'DISABLED') return 'Discord will not scan any media sent by users.';
            if (guild.explicitContentFilter === 'MEMBERS_WITHOUT_ROLES') return 'Discord will only scan media from people who do not have any roles assigned.';
            if (guild.explicitContentFilter === 'ALL_MEMBERS') return 'Discord will scan media from everyone regardless of roles.';
        }
        function getOwner (guild) {
            return guild.owner.user.tag;
        }
        function getRulesChannel (guild) {
            if (guild.rulesChannelID) {
            return `<#${guild.rulesChannelID}>`;
            } else return 'No rules channel'
        }
        function getMemberCount (guild) {
            return guild.members.cache.filter(member => !member.user.bot).size
        }
        function getBotCount (guild) {
            return guild.members.cache.filter(member => member.user.bot).size
        }
        function getTotalUsers (guild) {
            return guild.memberCount
        }
        function getRoleCount (guild) {
            return guild.roles.cache.size
        }
        function getBots (guild) {
            return guild.members.cache.filter(member => member.user.bot).map(member => `${member}`).join(', ')
        }
        function getOnlineUsers (guild) {
            return guild.members.cache.filter(member => member.user.presence.status !== 'offline' && !member.user.bot).size
        }
        function getTChannelCount (guild) {
            return guild.channels.cache.filter(channel => channel.isText()).size
        }
        function getVChannelCount (guild) {
            return guild.channels.cache.filter(channel => channel.type === 'voice' && !channel.name.includes('Member Count')).size
        }
        function getChannelCount (guild) {
            return guild.channels.cache.filter(ch => ch.type !== 'category').size
        }
        function getCreatedDate (guild) {
            return moment(guild.createdTimestamp).format('LLLL')
        }
        function getRegion (guild) {
            return guild.region
        }
        function getEmojiCount (guild) {
            let max
            if (guild.premiumTier === 0) max = 50
            if (guild.premiumTier === 1) max = 100
            if (guild.premiumTier === 2) max = 150
            if (guild.premiumTier === 3) max = 250
            let actual = guild.emojis.cache.filter(emoji => !emoji.animated).size
            return `${actual} / ${max}`
        }
        function getTierLevel(guild) {
            if (guild.premiumTier === 0) return 'No Level'
            if (guild.premiumTier === 1) return 'Level 1'
            if (guild.premiumTier === 2) return 'Level 2'
            if (guild.premiumTier === 3) return 'Level 3'
        }
        function getBoosters(guild) {
            let next 
            if (guild.premiumTier === 0) next = 2
            if (guild.premiumTier === 1) next = 15
            if (guild.premiumTier === 2) next = 30
            if (guild.premiumTier === 3) next = 50
            let actual = guild.premiumSubscriptionCount

            return `${actual} / ${next}`
        }
        
        const embed = new MessageEmbed() 
        .setAuthor(`${message.guild.name}'s Info`, message.guild.iconURL())
        .setThumbnail(message.guild.iconURL({ size: 4096 }))
        .addFields(
            {
                name: 'Guild Owner:',
                value: getOwner(message.guild),
                inline: true
            },
            {
                name: 'Guild Created Date:',
                value: getCreatedDate(message.guild),
                inline: true
            },
            {
                name: 'Guild Member Count:',
                value: getMemberCount(message.guild),
                inline: true
            },          
            {
                name: 'Guild Bot Count:',
                value: getBotCount(message.guild),
                inline: true
            }, 
            {
                name: 'Guild Total User Count:',
                value: getTotalUsers(message.guild),
                inline: true
            },

            {
                name: 'Guild Text Channel Count:',
                value: getTChannelCount(message.guild),
                inline: true
            },          
            {
                name: 'Guild Voice Channel Count:',
                value: getVChannelCount(message.guild),
                inline: true
            },            
            {
                name: 'Guild Channel Count:',
                value: getChannelCount(message.guild),
                inline: true
            },
            {
                name: 'Guild Emoji Count:',
                value: getEmojiCount(message.guild),
                inline: true
            },
            {
                name: 'Guild Tier Level',
                value: getTierLevel(message.guild),
                inline: true
            },
            {
                name: 'Guild Booster Count',
                value: getBoosters(message.guild),
                inline: true
            },
            {
                name: 'Guild Role Count:',
                value: getRoleCount (message.guild),
                inline: true
            },
            {
                name: 'Guild Region:',
                value: getRegion(message.guild),
                inline: true
            },
            {
                name: 'Guild Bots List:',
                value: getBots(message.guild),
            },
            {
                name: 'Users Online:',
                value: getOnlineUsers(message.guild),
                inline: true
            },
            {
                name: 'Guild Verification Level:',
                value: getVLevel(message.guild),
                inline: true
            },
            {
                name: 'Guild Explicit Content Filter:',
                value: getEfilter(message.guild),
                inline: true
            },
            {
                name: 'Guild Rules Channel:',
                value: getRulesChannel(message.guild),
                inline: true
            }
        )
        message.channel.send(embed)
    }
}