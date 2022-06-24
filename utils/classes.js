const classConversions = require('./classConversions')

class objBase {
    constructor(options) {
        this.options = options
    }
    /**
     * 
     * @param {Object} object 
     * @returns boolean
     */
    compare(object) {
        let zip = (a, b) => a.map((x, i) => [x, b[i]]);
        for (let [a, b] of zip(Object.values(object), Object.values(this.options))) {
            if (typeof a !== b) {
                return false
            }
        }
        return true
            
    }
}

    const EventEmitter = require('events');
    const { Client } = require('discord.js');

class DummyClient extends EventEmitter {
    constructor() {
        super()
    }

    emits() {
        this.emit('Hello!!!', 'I..', 'Bruh')
    }
} 

class DummyClient2 extends DummyClient {
    constructor() {
        super()
        this.emits()
    }
}



module.exports.objBase = objBase
module.exports.DummyClient = DummyClient2