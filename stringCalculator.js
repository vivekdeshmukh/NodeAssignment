class StringCalculator {
    add(input) {
      if (!input) return 0;
  
      const { numbers, delimiter } = this._parseInput(input);
      const numArray = numbers
        .split(delimiter)
        .map(Number)
        .filter(n => !isNaN(n));
  
      this._checkForNegatives(numArray);
  
      return numArray
        .filter(n => n <= 1000)
        .reduce((sum, num) => sum + num, 0);
    }
  
    _parseInput(input) {
      let delimiter = /,|\n/;
      let numbers = input;
  
      if (input.startsWith("//")) {
        const [, custom, rest] = input.match(/^\/\/(.*)\n(.*)/);
        delimiter = this._parseCustomDelimiters(custom);
        numbers = rest;
      }
  
      return { numbers, delimiter };
    }
  
    _parseCustomDelimiters(custom) {
      if (custom.startsWith("[")) {
        // Multiple delimiters
        return new RegExp(
          custom
            .match(/\[.*?\]/g)
            .map(d => d.slice(1, -1).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
            .join("|")
        );
      } 
      // Single custom delimiter
      return new RegExp(custom.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    }
  
    _checkForNegatives(numbers) {
      const negatives = numbers.filter(n => n < 0);
      if (negatives.length) {
        throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
      }
    }
  }
  
  module.exports = StringCalculator;
  