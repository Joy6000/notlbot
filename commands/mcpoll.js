module.exports = {
    name: 'mcpoll',
    category: 'Fun',
    usage: '<choice1>, <choice2>, ... <choice5>',
    reqArgs: 2,
    maxArgs: 5,
    async execute({ message, args }) {
        reactionCount = args.length // how many choices there are
        reactions = [
            '🇦',
            '🇧',
            '🇨', 
            '🇩',
            '🇪'
        ] // chosen reactions in an array

        console.log(reactions[reactionCount])
        let preReact = reactions.splice(0, reactionCount)
        preReact.forEach(v => message.react(v))
        }
}