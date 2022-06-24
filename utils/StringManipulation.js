       /**
        * 
        * @param {String} name 
        * @param {String} as 
        * @returns newStr, this
        * @example
        * '{example}'.replaceBracket('example', 'Hello!') // Output: 'Hello!'
        */
       String.prototype.replaceBracket = function(name, as) {
        return this.replace(`{${name}}`, as)
       }