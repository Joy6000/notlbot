module.exports = {
    name: 'choose',
    reqArgs: 3,
    maxArgs: 10,
    category: 'Fun',
    usage: '<option1>, <option2>, ... <option10>',
    async execute({ message, args, client, handler}) {
        function choose (tochoose) {
            const returned = tochoose[Math.floor(Math.random()*tochoose.length)]
            return returned
        }
        let thing = args.join(' ').replaceAll(',', '')
        let newargs = thing.split(' ')
        message.channel.send(choose(newargs))
       

    }

}