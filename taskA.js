function isValidExpression(expr) {
    // Remove any whitespace from the expression
    expr = expr.replace(/\s+/g, "");
  
    // Define a regex pattern to match valid expressions
    const pattern = /^(?:\d+(?:\.\d+)?|[\+\-]?\d+(?:\.\d+)?|\b(sin|cos|tan)\b\()|(?:[+\-*/()])$/;
  
    // Check if the expression matches the pattern
    if (!pattern.test(expr)) {
      return false;
    }
  
    // Count the number of open and closed parentheses
    let openParentheses = 0;
    let closedParentheses = 0;
  
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === "(") {
        openParentheses++;
      } else if (expr[i] === ")") {
        closedParentheses++;
      }
  
      // Check if there are more closed parentheses than open parentheses
      if (closedParentheses > openParentheses) {
        return false;
      }
    }
  
    // Check if the number of open parentheses equals the number of closed parentheses
    if (openParentheses !== closedParentheses) {
      return false;
    }
  
    // Check if the expression ends with an operator
    const lastChar = expr[expr.length - 1];
    if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
      return false;
    }
  
    // The expression is valid
    return true;
  }
  
  
  


console.log(isValidExpression("3 + 2 + 4"));    // true
console.log(isValidExpression("+2"));    // true
console.log(isValidExpression("-2"));    // true
console.log(isValidExpression("sin(sin(30) + cos(20))"));    // true
console.log(isValidExpression("sin(30) + cos(20)"));    // true
console.log(isValidExpression("sin(30"));    // false
console.log(isValidExpression("(3 + +"));    // false
console.log(isValidExpression("3+"));    // false




