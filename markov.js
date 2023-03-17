/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
        let obj = {};

        for (let word of this.words) {
            obj[word] = [];
            let index = this.words.indexOf(word);
        
            while (index !== -1) {
                obj[word].push(this.words[index + 1]);
                index = this.words.indexOf(word, index + 1);

            }

        }
        this.chains = obj;
    }
  
  
    /** return random text from chains */
  
    /** Pick random choice from array */

    static choice(obj) {
        if (!obj) return null
        let length = Object.keys(obj).length ? Object.keys(obj).length : 0
        return obj[Math.floor(Math.random() * length)];
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        // pick a random key to begin
        let keys = Array.from(Object.keys(this.chains));
        let key = MarkovMachine.choice(keys);
        let out = [];

        // produce markov chain until reaching termination word
        while (out.length < numWords && key !== null) {
        out.push(key);
        key = MarkovMachine.choice(this.chains[key]);
        }

        return out.join(" ");
    }
  }
module.exports = {
    MarkovMachine,
};