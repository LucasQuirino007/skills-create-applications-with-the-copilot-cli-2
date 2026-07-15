const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  normalizeOperation,
  calculate,
  runCli,
} = require("../calculator");

describe("calculator operations", () => {
  describe("addition", () => {
    test("adds positive numbers", () => {
      expect(addition(2, 3)).toBe(5);
    });

    test("adds negative and decimal numbers", () => {
      expect(addition(-2.5, 1.5)).toBeCloseTo(-1);
    });
  });

  describe("subtraction", () => {
    test("subtracts positive numbers", () => {
      expect(subtraction(10, 4)).toBe(6);
    });

    test("subtracts resulting in negative number", () => {
      expect(subtraction(4, 10)).toBe(-6);
    });
  });

  describe("multiplication", () => {
    test("multiplies positive numbers", () => {
      expect(multiplication(45, 2)).toBe(90);
    });

    test("multiplies by zero", () => {
      expect(multiplication(99, 0)).toBe(0);
    });
  });

  describe("division", () => {
    test("divides positive numbers", () => {
      expect(division(20, 5)).toBe(4);
    });

    test("handles decimal result", () => {
      expect(division(7, 2)).toBeCloseTo(3.5);
    });

    test("throws on division by zero", () => {
      expect(() => division(10, 0)).toThrow("Erro: divisão por zero não é permitida.");
    });
  });

  describe("modulo", () => {
    test("returns division remainder", () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test("matches extended example 5 % 2", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("throws on modulo by zero", () => {
      expect(() => modulo(10, 0)).toThrow("Erro: modulo por zero não é permitido.");
    });
  });

  describe("power", () => {
    test("calculates exponentiation", () => {
      expect(power(2, 3)).toBe(8);
    });
  });

  describe("squareRoot", () => {
    test("calculates square root", () => {
      expect(squareRoot(25)).toBe(5);
    });

    test("matches extended example sqrt(16)", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-9)).toThrow(
        "Erro: não é possível calcular raiz quadrada de número negativo.",
      );
    });
  });
});

describe("operation normalization and calculate", () => {
  test("normalizes operation aliases", () => {
    expect(normalizeOperation("+")).toBe("addition");
    expect(normalizeOperation("subtract")).toBe("subtraction");
    expect(normalizeOperation("x")).toBe("multiplication");
    expect(normalizeOperation("/")).toBe("division");
    expect(normalizeOperation("%")).toBe("modulo");
    expect(normalizeOperation("pow")).toBe("power");
    expect(normalizeOperation("sqrt")).toBe("squareRoot");
  });

  test("throws for unsupported operation", () => {
    expect(() => normalizeOperation("unknown")).toThrow(
      "Erro: operação inválida. Use +, -, *, /, %, ^ ou sqrt.",
    );
  });

  test("calculates using operation aliases", () => {
    expect(calculate(5, "add", 2)).toBe(7);
    expect(calculate(5, "-", 2)).toBe(3);
    expect(calculate(5, "multiply", 2)).toBe(10);
    expect(calculate(20, "division", 5)).toBe(4);
    expect(calculate(10, "%", 3)).toBe(1);
    expect(calculate(2, "^", 4)).toBe(16);
    expect(calculate(25, "sqrt", 0)).toBe(5);
  });
});

describe("CLI behavior", () => {
  test("executes examples shown in the image", () => {
    expect(runCli(["2", "+", "3"])).toBe(5);
    expect(runCli(["10", "-", "4"])).toBe(6);
    expect(runCli(["45", "*", "2"])).toBe(90);
    expect(runCli(["20", "/", "5"])).toBe(4);
  });

  test("throws when arguments count is invalid", () => {
    expect(() => runCli(["2", "x"])).toThrow(
      "Uso: node src/calculator.js <numero1> <operacao> <numero2>",
    );
  });

  test("executes square root in CLI with unary format", () => {
    expect(runCli(["sqrt", "81"])).toBe(9);
  });

  test("executes extended operation examples from image", () => {
    expect(runCli(["5", "%", "2"])).toBe(1);
    expect(runCli(["2", "^", "3"])).toBe(8);
    expect(runCli(["sqrt", "16"])).toBe(4);
  });

  test("throws when operands are invalid", () => {
    expect(() => runCli(["abc", "+", "2"])).toThrow("Erro: os operandos devem ser números válidos.");
  });

  test("throws when dividing by zero via CLI input", () => {
    expect(() => runCli(["10", "/", "0"])).toThrow("Erro: divisão por zero não é permitida.");
  });
});
