class OverwatchError extends Error {
    constructor(message, res) {
        super(message);

        Object.assign(this, res)
        this.name = this.constructor.name
    }
}

module.exports = OverwatchError