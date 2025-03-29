class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;

    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
      const match = numbers.match(/^\/\/(\[.*?\]|\S)\n/);
      if (match) {
        let customDelimiter = match[1];
        if (customDelimiter.startsWith("[")) {
          customDelimiter = customDelimiter
            .slice(1, -1)
            .split("][")
            .map(d => d.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
            .join("|");
        } else {
          customDelimiter = customDelimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        delimiter = new RegExp(customDelimiter);
        numbers = numbers.split("\n").slice(1).join("\n");
      }
    }

    const numArray = numbers.split(delimiter).map(num => parseInt(num, 10)).filter(n => !isNaN(n));

    const negatives = numArray.filter(n => n < 0);
    if (negatives.length) {
      throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
    }

    return numArray.filter(n => n <= 1000).reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;
