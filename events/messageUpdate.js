module.exports = (client, handler, newMessage, oldMessage) => {
    (async () => {
        if (newMessage.channel.id === '837079824082272337') {
            if (newMessage.author.id === '527599831091380234') return
            if (newMessage.content.toLowerCase().includes('first')) newMessage.delete()
        }
    })()
}