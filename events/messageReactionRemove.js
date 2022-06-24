module.exports = async (client, handler, messageReaction, user) => {
        function checkingRemove(bool = false) {
        if ((messageReaction.count < 1 || messageReaction.count === 1)&& messageReaction.emoji.name === '⭐') {
            bool = true
        } 
    }
    module.exports = checkingRemove
}