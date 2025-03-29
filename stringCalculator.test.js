const StringCalculator = require("./stringCalculator");

describe("String Calculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  test("should return 0 for an empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  test("should return the number itself for a single number", () => {
    expect(calculator.add("5")).toBe(5);
  });

  test("should return sum of two numbers separated by comma", () => {
    expect(calculator.add("1,2")).toBe(3);
  });

  test("should handle multiple numbers", () => {
    expect(calculator.add("1,2,3,4")).toBe(10);
  });

  test("should handle new lines as delimiters", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });

  test("should support custom delimiters", () => {
    expect(calculator.add("//;\n1;2;3")).toBe(6);
  });

  test("should throw an error for negative numbers", () => {
    expect(() => calculator.add("1,-2,3,-4")).toThrow("Negatives not allowed: -2,-4");
  });

  test("should ignore numbers greater than 1000", () => {
    expect(calculator.add("2,1001,3")).toBe(5);
  });

  test("should support delimiters of any length", () => {
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
  });

  test("should support multiple custom delimiters", () => {
    expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
  });
});
