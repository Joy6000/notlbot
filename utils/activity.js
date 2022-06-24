module.exports = async (client) => {
    setInterval(() => {
    client.user.setPresence({
        activity: {
            name: `Manaport`,
            type: 'PLAYING'
        },
        afk: true
        })
    }, 10000)
}