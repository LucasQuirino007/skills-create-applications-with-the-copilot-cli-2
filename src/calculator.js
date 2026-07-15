#!/usr/bin/env node

/**
 * Operações suportadas por esta calculadora CLI:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
 * - modulo (%)
 * - power (^, **)
 * - square root (sqrt)
 */

const OPERATION_ALIASES = {
  "+": "addition",
  addition: "addition",
  add: "addition",
  "-": "subtraction",
  subtraction: "subtraction",
  subtract: "subtraction",
  "*": "multiplication",
  x: "multiplication",
  multiplication: "multiplication",
  multiply: "multiplication",
  "/": "division",
  division: "division",
  divide: "division",
  "%": "modulo",
  modulo: "modulo",
  mod: "modulo",
  "^": "power",
  "**": "power",
  power: "power",
  pow: "power",
  sqrt: "squareRoot",
  squareroot: "squareRoot",
  "square-root": "squareRoot",
};

function assertValidNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`Erro: ${label} deve ser um número válido.`);
  }
}

function addition(firstNumber, secondNumber) {
  assertValidNumber(firstNumber, "primeiro operando");
  assertValidNumber(secondNumber, "segundo operando");
  return firstNumber + secondNumber;
}

function subtraction(firstNumber, secondNumber) {
  assertValidNumber(firstNumber, "primeiro operando");
  assertValidNumber(secondNumber, "segundo operando");
  return firstNumber - secondNumber;
}

function multiplication(firstNumber, secondNumber) {
  assertValidNumber(firstNumber, "primeiro operando");
  assertValidNumber(secondNumber, "segundo operando");
  return firstNumber * secondNumber;
}

function division(firstNumber, secondNumber) {
  assertValidNumber(firstNumber, "primeiro operando");
  assertValidNumber(secondNumber, "segundo operando");
  if (secondNumber === 0) {
    throw new Error("Erro: divisão por zero não é permitida.");
  }
  return firstNumber / secondNumber;
}

function modulo(firstNumber, secondNumber) {
  assertValidNumber(firstNumber, "primeiro operando");
  assertValidNumber(secondNumber, "segundo operando");
  if (secondNumber === 0) {
    throw new Error("Erro: modulo por zero não é permitido.");
  }
  return firstNumber % secondNumber;
}

function power(base, exponent) {
  assertValidNumber(base, "base");
  assertValidNumber(exponent, "exponente");
  return base ** exponent;
}

function squareRoot(number) {
  assertValidNumber(number, "número");
  if (number < 0) {
    throw new Error("Erro: não é possível calcular raiz quadrada de número negativo.");
  }
  return Math.sqrt(number);
}

function normalizeOperation(operation) {
  const normalizedOperation = OPERATION_ALIASES[String(operation || "").toLowerCase()];

  if (!normalizedOperation) {
    throw new Error("Erro: operação inválida. Use +, -, *, /, %, ^ ou sqrt.");
  }

  return normalizedOperation;
}

function calculate(firstNumber, operation, secondNumber) {
  const normalizedOperation = normalizeOperation(operation);

  switch (normalizedOperation) {
    case "addition":
      return addition(firstNumber, secondNumber);
    case "subtraction":
      return subtraction(firstNumber, secondNumber);
    case "multiplication":
      return multiplication(firstNumber, secondNumber);
    case "division":
      return division(firstNumber, secondNumber);
    case "modulo":
      return modulo(firstNumber, secondNumber);
    case "power":
      return power(firstNumber, secondNumber);
    case "squareRoot":
      return squareRoot(firstNumber);
    default:
      throw new Error("Erro: operação não suportada.");
  }
}

function runCli(args = process.argv.slice(2)) {
  if (args.length === 2) {
    const [operationArg, firstArg] = args;
    const normalizedOperation = OPERATION_ALIASES[String(operationArg || "").toLowerCase()];
    if (normalizedOperation !== "squareRoot") {
      throw new Error(
        "Uso: node src/calculator.js <numero1> <operacao> <numero2>\nExemplo: node src/calculator.js 10 + 5",
      );
    }

    const firstNumber = Number(firstArg);
    if (!Number.isFinite(firstNumber)) {
      throw new Error("Erro: os operandos devem ser números válidos.");
    }

    return calculate(firstNumber, normalizedOperation, 0);
  }

  if (args.length !== 3) {
    throw new Error(
      "Uso: node src/calculator.js <numero1> <operacao> <numero2>\nExemplo: node src/calculator.js 10 + 5",
    );
  }

  const [firstArg, operationArg, secondArg] = args;
  const firstNumber = Number(firstArg);
  const secondNumber = Number(secondArg);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new Error("Erro: os operandos devem ser números válidos.");
  }

  return calculate(firstNumber, operationArg, secondNumber);
}

if (require.main === module) {
  try {
    const result = runCli();
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
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
};
