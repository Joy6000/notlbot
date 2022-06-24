module.exports = async (client, handler, messageReaction, user) => {
        function checkingAdd(bool) {
        if (messageReaction.count > 1 && messageReaction.emoji.name === '⭐') {
            bool = true
        } else bool = false
    }
    module.exports = checkingAdd
}