const MESSAGES = {
    PING: {
        INITIAL: 'Pinging....',
        SUCCESS: '{emoji} Latency Report:\nLocal Latency: `{ping}ms`\nAPI Heartbeat: `{API}ms`'
    },
    PURGE: {
        SUCCESS: '**Deleted {toPurge} messages!**',
        TIMEOUT: 5000
    },
    TEST: {
        SUCCESS: 'Works. {variable}'
    },
    WARN: {
        SUCCESS: '{individual} has been warned.\nThis is their {warns}{end}',
        NO_USER: 'No such user exists.',
        
    }
}

module.exports.messages = MESSAGES