"use strict";


class Carray extends Array {
    constructor(entries) {
        super(entries);

    }
    /**
     * Finds a specified key in this Carray
     * @param {*} key
     * @returns {* | undefined}
     */
    get(key) {
        return super.find(x => x === key)
    }
    /**
     * Add a key to this Carray
     * @param {*} key 
     * @returns {* | undefined}
     */
    add(key) {
        return super.push(key)
    }
    /**
     * Sets this Carray to specified key
     * @param {Array|Carray} key 
     * @returns {String}
     */
    set(...keys) {
        for (const k of keys) {
        while (super.length > 0) super.pop();
            this.add(k)
        }
    }
    /**
     * 
     * @param {*} fn 
     * @param {*} thisArg 
     * @returns {Carray}
     */
    filter(fn, thisArg) {
        if (typeof fn !== 'undefined') 
            fn = fn.bind(thisArg)
        const results = new this.constructor[Symbol.species]();
        console.log(results)
        for (const [k, v] of this) {
            if (fn(v, k, this)) {
                results.add(k, v)
            }
        }
    }
}

module.exports = Carray