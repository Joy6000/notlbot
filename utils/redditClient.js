// baseclient extends eventemitter
const BaseClient = require('./redditClientBase')
// snekfetch to fetch new posts from reddit
const snekfetch = require('snekfetch')
// array to make sure there are no repeat posts
let last = []
// class
class redditClient extends BaseClient {
   constructor() {
        super();
    }
      // ready initializes everything. Must be called to subscribe to the 'post' event.
    async ready(sub) {
      // fetched from reddit
        let got = await snekfetch.get(`http://www.reddit.com/r/${sub}/new.json?sort=new`)

        // ready event
        this.emit('ready')
        // interval, checks for new posts
        setInterval(() => {
          // if the 'last' array has the new title, return. Filter out repeat posts
          if (last.includes(got.body.data.children[0].data.title)) return;
          // emit post
          this.emit('post', got.body.data.children[0].data);
          // push to title to array.
          last.push(got.body.data.children[0].data.title);
        }, 5000)
    }
}

module.exports = redditClient