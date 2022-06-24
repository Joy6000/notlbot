const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'memes',
    aliases: ['meme', 'm'],
    category: 'Fun',
    async execute({ message }) {
        const snekfetch = require('snekfetch')
        let reddits = [
            'memes',
            'dankmemes',
            'funny'
        ]
        let num1 = Math.floor(Math.random() * reddits.length)

        let fetched = await snekfetch.get(`https://reddit.com/r/${reddits[num1]}/hot.json`)

        let num2 = Math.floor(Math.random() * fetched.body.data.children.length)

        let data = fetched.body.data.children[num2].data

        let embed = new MessageEmbed()
        .setTitle(data.title)
        .setURL(`https://reddit.com${data.permalink}`)
        if (!data.url.startsWith('https://v')) {
        embed.setImage(data.url)
        if (data.url.startsWith('https://v')) {
            embed.setDescription(`[View Post](https://reddit.com${data.permalink})`)
        }
        }
        if (data.selftext !== '') {
            embed.setDescription(data.selftext)
        }
        embed.setFooter(`👍 ${data.ups} | 💬 ${data.num_comments}`)
        .addField('Post Author', '/u/' + data.author)
        .addField('Post Subreddit', '/' + data.subreddit_name_prefixed)
        message.channel.send(embed)
    }
}