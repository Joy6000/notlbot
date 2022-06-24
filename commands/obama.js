const snekfetch = require('snekfetch')

const sleep = require('util').promisify(setTimeout)

module.exports = {
    name: 'obama',
    aliases: ['obamaify'],
    reqArgs: 1,
    usage: '<Message>',
    category: 'Fun',
    cooldown: 10,
    async execute({ message, args }) {

        let reuse = true
        if (!reuse) return message.reply('One request a time.')
        let text = args.join(' ')
        message.channel.startTyping()

        let request;
        try {
            request = await snekfetch.post("http://talkobamato.me/synthesize.py", { redirect: false }).attach("input_text", text);
        } catch (err) {
            message.channel.send('Sorry, there was an error with the generator. Try again later')
            console.log(err)
            return message.channel.stopTyping();
        }
        //console.log(request.headers.location);
        const videoURLBase = `http://talkobamato.me/synth/output/${request.headers.location.split("=")[1]}`;
        const videoURL = `${videoURLBase}/obama.mp4`;
        const videoDoneURL = `${videoURLBase}/video_created.txt`;
        let videoDone = await snekfetch.get(videoDoneURL).catch(() => { });

        while (!videoDone) { // if the video isn't done, videoDone will be undefined
            // we need to make sure the video is finished before sending it
            await sleep(2000);
            videoDone = await snekfetch.get(videoDoneURL).catch(() => { });
            reuse = false
        }
        // video should be done now, send it
        message.channel.send({ files: [videoURL] }).catch(() => message.channel.send('Sorry, there was an error with the generator. Try again laster'));
        message.channel.stopTyping();
        reuse = true
    }
}