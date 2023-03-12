// Reference: https://stackoverflow.com/questions/59325015/how-to-implement-build-in-function-eval-with-recursive-function
// Partially correct with some changes on the trigonomtry functions

const evalNumericExpr = (() => {
  const ops = [
    [
      // grouping
      /\(([^()]+)\)/,
      (evaluator, subexpr) => evaluator(subexpr),
    ],
    [
      //trigonomtry
      /^(\s*|\(.*\)|-?\d+(\.\d+)?)[sct]([ioa][ns]?)\(/i,
      (
        (ops) => (_, a) =>
          ops[op](Number(a))
      )({ sin: (a) => Math.sin(a) }),
    ],
    [
      // multiplication, divide, remainder
      /([-+]?\d+)\s*([*%\/])\s*([-+]?\d+)/,
      (
        (ops) => (_, a, op, b) =>
          ops[op](Number(a), Number(b))
      )({ "*": (a, b) => a * b, "/": (a, b) => a / b, "%": (a, b) => a % b }),
    ],
    [
      // addition, subtraction
      /([-+]?\d+)\s*([+-])\s*([-+]?\d+)/,
      (
        (ops) => (_, a, op, b) =>
          ops[op](Number(a), Number(b))
      )({ "+": (a, b) => a + b, "-": (a, b) => a - b }),
    ],
  ];
  const evaluator = (expr) =>
    Number(
      ops.reduce(
        (expr, [regex, fn]) =>
          regex.test(expr)
            ? evaluator(
                expr.replace(regex, (...args) =>
                  fn(evaluator, ...args.slice(1))
                )
              )
            : expr,
        expr
      )
    );
  return evaluator;
})();

// Test
[
  "3 * 4",
  "7 - 2",
  "2 * 6",
  "12 / 4",
  "2 + 4 + 7",
  "5 * 2 + 10",
  "10 - 20 + 30 * 2 / 10",
  "1 + 5 * 2 + 12 * 2 * 2",
  "10 + 13 - 5 * 3 + 12 / 3 + 3",
  "10 + (13 - 5) * 3 + 12 / 3 + 3",
  "5 * (4 + (2 * (1 + 1 + 1)))",
  "5 ^ 2",
  "5 ^ 2 * 2",
  "2 ^ 3 ^ 2", // Note: should parse as `2 ^ (3 ^ 2)`, not `(2 ^ 3) ^ 2`
  "2 ^ 3 ^ 2 + 3 ^ 3 * 2",
].forEach((expr) => console.log(`${expr} ==> ${evalNumericExpr(expr)}`));
